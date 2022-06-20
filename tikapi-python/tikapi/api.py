#/usr/bin/python3

#############################
#  Made with Rests          #
#  github.com/el1s7/rests   #
#############################

from typing import Callable
import requests
import re
import warnings

warnings.filterwarnings("ignore")


class APIResponse(requests.Response):

	def next_items() -> 'APIResponse':
		'''
			A convenient method to get the next batch of items, if the endpoint has iteration parameters (e.g cursor)
		'''
		pass

	

class APIException(Exception):
	pass

class ValidationException(Exception):
	field: str = None
	pass

class ResponseException(APIException):
	response: APIResponse = None
	pass

class Default:
	'''
		Store function default args and distinguish between explicit args
	'''
	def __repr__(self):
		return str(self.value)
	
	def __init__(self, value):
		self.value = value

def make_request(url, method, requests_kwargs) -> requests.Response:
	return getattr(requests, method)(url, verify=False, **requests_kwargs)

def copy_options(o: dict): 
	o = o or {}
	return {
		**o,
		'params': {
			**o.get('params', {})
		},
		'values': {
			**o.get('values', {})
		},
		'headers': {
			**o.get('headers', {})
		},
	}

def parse_set(values: dict):

	if not isinstance(values, dict):
		raise APIException("Invalid $options object.")
	
	store_options = copy_options(values.get("$options", {}))

	if values.get("$options"):
		del values["$options"]

	for key, value in list(values.items()):
		if (value is None):
			del values[key]
	
	return {
		**store_options,
		'values':{
			**store_options.get('values',{}),
			**values
		}
	}

def merge_options(prev: dict, current: dict, mutate=False):

	first_options = (prev or copy_options({})) if mutate else copy_options(prev)

	second_options = copy_options(current)

	second_options['headers'] = {
		**first_options['headers'],
		**second_options['headers']
		
	}

	second_options['params'] = {
		**first_options['params'],
		**second_options['params']
	}

	second_options['values'] = {
		**first_options['values'],
		**second_options['values']
	}
	
	first_options.update(second_options)

	return first_options


def get_one(*args):
	'''
		Return a value that is not None
	'''
	for arg in args:
		if arg is not None:
			return arg
	
	return None

def Rests(options: dict):
	
	global_options = {"base":"https://api.tikapi.io","headers":{"User-Agent":"Rests Python (v1.0.2)"},"params":{"apiKey":{"name":"X-API-KEY","required":True,"location":"headers","validate":"^[a-zA-Z0-9]{10,}$","example":"myApiKey","$tshide":True}},"values":{},"on_error":None,"on_success":None,"on_request":None,"proxies":None,"__$root__":"API"}

	merge_options(global_options, (options or {}), True)

	encoding_map = {
		"json": "json",
		"form": "data",
		"urlencoded": "data",
	}

	allowed_param_locations = ["headers", "body", "query", "path"]

	def_param_locations = {
		'post': 'body',
		'get': 'query',
	}

	type_map = {
		'str': 'string',
		'int': 'number',
		'float': 'number',
		'bool': 'boolean',
		'list': 'array',
		'tuple': 'array',
		'dict': 'object'
	}

	def wrap(request:dict, category_options: dict=None, category_key: str= None) -> Callable[[dict], APIResponse]:
			request['method'] = request.get('method','get').lower()
			request['params'] = request.get('params', {})
			bound_options = category_options

			def process_request(**params):

				current_options = merge_options(global_options, bound_options)

				current_options['on_request'] = request.get('on_request',current_options.get('on_request'))
				current_options['on_success'] = request.get('on_success',current_options.get('on_success'))
				current_options['on_error'] = request.get('on_error',current_options.get('on_error'))

				url = f"{current_options.get('base','')}{request.get('path','')}"

				options = {
					"method": request['method'],
					"headers": {**current_options.get('headers')},
					"proxies": current_options.get('proxies'),
				}

				body_type = encoding_map.get(request.get("enctype"), "json")

				body_store = {}
				query_store = {}

				request_params = {**current_options.get('params',{}), **request.get("params",{})}

				for param_name, param in request_params.items():

					current_param_value = params.get(param_name)
					default_param_value = param.get("default")
					options_param_value = current_options.get('values',{}).get(param_name)
					example_param_value = param.get("example") if params.get("__rest_testing__") else None

					param_value = get_one(
						current_param_value, 
						options_param_value,
						example_param_value,
						default_param_value, 
					)

					param_dest = param.get("name") or param_name
					param_error = param.get("help") or f"The '{param_name}' field is invalid."

					exception = ValidationException(param_error)
					exception.field = param_name

					if param.get("required") and param_value is None:
						raise exception from None

					elif param_value is None:
						continue

					if param.get("format") and callable(param.get("format")):
						try:
							param_value = param["format"](param_value)
						except Exception as e:
							exception = ValidationException(e.args[0] or param_error)
							exception.field = param_name
							raise exception from None

					if param.get("type") and param["type"] != "any":
						if (
							(
								type_map.get(type(param_value).__name__) != param['type']
							)
						):
							raise exception from None

					if param.get("validate") and not re.match(param["validate"], str(param_value)):
						raise exception from None

					if param.get("in") and isinstance(param["in"], list) and param_value not in param["in"]:
						raise exception from None

					param_location = (
						param.get("location")
						if type(param.get("location")) == str
						else def_param_locations[options["method"]]
					)

					if param_location not in allowed_param_locations:
						exception = ValidationException(f"Invalid location for '{param_name}' field.")
						exception.field = param_name
						raise exception from None

					if param_location == "headers":
						options["headers"] = options.get("headers", {})
						options["headers"][param_dest] = param_value
						continue

					if param_location == "body":
						body_store[param_dest] = param_value
						continue

					if param_location == "query":
						query_store[param_dest] = param_value
						continue

					if param_location == "path":
						url = url.replace(":{}".format(re.escape(param_dest)), str(param_value))


				options['body'] = body_store
				options['query'] = query_store
				options['encoding'] = body_type

				request_info = {
					'url': url, 
					'options': options, 
					'params': params,
					'key': category_key,
					'instance': Rests,
					'self': wrap(request, category_options, category_key)
				}

				if(callable(current_options.get('on_request'))):

					requestCallbackRes = current_options.on_request(request_info)

					if(requestCallbackRes):
						returnsUrl = (isinstance(requestCallbackRes, dict) and requestCallbackRes.get('url'))
						returnsOptions = (isinstance(requestCallbackRes, dict) and requestCallbackRes.get('options'))

						if not returnsUrl or returnsOptions:
							return requestCallbackRes
						
						if(returnsUrl):
							url = requestCallbackRes.get('url')
							request_info['url'] = url

						if(returnsOptions):
							options =  requestCallbackRes.get('options')
							request_info['options'] = options

					if(requestCallbackRes == False):
						return False

				requests_kwargs = {
					'headers': options.get('headers', {}),
					'proxies': options.get('proxies', None)
				}

				if(len(options['body'])):
					requests_kwargs[options['encoding']] = options['body']

				if(len(options['query'])):
					requests_kwargs['params'] = options['query']

				try:
					response = make_request(url, options['method'], requests_kwargs)
					response.raise_for_status()

					if(callable(current_options.get('on_success'))):
						successCallbackRes = current_options.get('on_success')(response, request_info)
						if(successCallbackRes != None):
							return successCallbackRes

					return response

				except requests.HTTPError as e:
					exception = ResponseException(e)
					exception.response = e.response

				except Exception as e:
					exception = e
					
				if(callable(current_options.get('on_error'))):
					errorCallbackRes = current_options.get('on_error')(exception, request_info)
					if(errorCallbackRes != None):
						return errorCallbackRes

				raise exception

			return process_request


	class BaseClass:

		__options__ = {}

		def __new__(cls, **values) -> 'BaseClass':

			if global_options.get('__$root__') == cls.__name__:
				raise APIException("This is already initialized, you can use 'set' instead.")

			currentOptions = merge_options(global_options, cls.__get_options__())

			updateOptions = parse_set(values)

			newOptions = merge_options(currentOptions, updateOptions)

			newObject = Rests({
				**newOptions,
				"__$root__": cls.__name__
			})

			newMe = getattr(newObject.__Rests__, cls.__name__)

			return newMe

		@classmethod
		def _set(cls, **values) -> 'BaseClass':
			'''
				Update values
			'''
			if global_options.get('__$root__') != cls.__name__:
				raise APIException("You can only call set on initialized roots.")
		
			merge_options(global_options, parse_set(values), True)
		
			return cls
		
		@classmethod
		def __get_options__(cls):
			if global_options.get('__$root__') == cls.__name__:
				return global_options
			else:
				return cls.__options__

	
	Rests.BaseClass = BaseClass



	class PublicDiscover(Rests.BaseClass):
		'''
			Discover Endpoints Category 
		'''

		__options__ = {"headers":{},"params":{"country":{"required":False,"type":"string","example":"us","validate":"^[a-z]{,2}$"},"keyword":{"help":"Discover keyword is optional","example":"lilyachty","type":"string"},"count":{"example":30,"default":30,"type":"number","validate":"^[0-9]{1,2}$"},"offset":{"help":"The starting offset of items list.","type":"number","validate":"^[0-9]+$"}},"values":{}}

		def __new__(self, keyword: str = None, count: int = None, offset: int = None, **values) -> 'PublicDiscover':
			'''
				Initialize new 'PublicDiscover' instance with default values & options
			'''
			return super().__new__(self, keyword=keyword, count=count, offset=offset, **values)

		@classmethod
		def _set(self, keyword: str = None, count: int = None, offset: int = None, **values) -> 'PublicDiscover':
			'''
				Set default values & options for 'PublicDiscover'
				Method works only root category.
			'''
			return super()._set(keyword=keyword, count=count, offset=offset, **values)
	
		@classmethod
		def users(cls, country: str = None, keyword: str = None, count: int = Default(30), offset: int = None, **otherParams) -> APIResponse:
			'''
				Users - GET request 
			'''
			count = None if count is cls.users.__defaults__[2] else count
			return wrap({"path":"/public/discover/users","method":"GET","params":{}}, cls.__get_options__(), "PublicDiscover.users")(country=country, keyword=keyword, count=count, offset=offset, **otherParams)
	
		@classmethod
		def music(cls, country: str = None, keyword: str = None, count: int = Default(30), offset: int = None, **otherParams) -> APIResponse:
			'''
				Music - GET request 
			'''
			count = None if count is cls.music.__defaults__[2] else count
			return wrap({"path":"/public/discover/music","method":"GET","params":{}}, cls.__get_options__(), "PublicDiscover.music")(country=country, keyword=keyword, count=count, offset=offset, **otherParams)
	
		@classmethod
		def hashtag(cls, country: str = None, keyword: str = None, count: int = Default(30), offset: int = None, **otherParams) -> APIResponse:
			'''
				Hashtag - GET request 
			'''
			count = None if count is cls.hashtag.__defaults__[2] else count
			return wrap({"path":"/public/discover/hashtag","method":"GET","params":{}}, cls.__get_options__(), "PublicDiscover.hashtag")(country=country, keyword=keyword, count=count, offset=offset, **otherParams)
	
	Rests.PublicDiscover = PublicDiscover
	class PublicSearch(Rests.BaseClass):
		'''
			Search Endpoints Category 
		'''

		__options__ = {"headers":{},"params":{"country":{"required":False,"type":"string","example":"us","validate":"^[a-z]{,2}$"},"keyword":{"help":"Discover keyword is optional","example":"lilyachty","type":"string"},"count":{"example":30,"default":30,"type":"number","validate":"^[0-9]{1,2}$"},"offset":{"help":"The starting offset of items list.","type":"number","validate":"^[0-9]+$"},"query":{"type":"string","required":True,"help":"The search keyword"}},"values":{}}

		def __new__(self, query: str = None, offset: int = None, **values) -> 'PublicSearch':
			'''
				Initialize new 'PublicSearch' instance with default values & options
			'''
			return super().__new__(self, query=query, offset=offset, **values)

		@classmethod
		def _set(self, query: str = None, offset: int = None, **values) -> 'PublicSearch':
			'''
				Set default values & options for 'PublicSearch'
				Method works only root category.
			'''
			return super()._set(query=query, offset=offset, **values)
	
		@classmethod
		def general(cls, query: str = None, country: str = None, keyword: str = None, count: int = Default(30), offset: int = None, **otherParams) -> APIResponse:
			'''
				Search anything 
			'''
			count = None if count is cls.general.__defaults__[3] else count
			return wrap({"path":"/public/search/general","help":"Search anything","method":"GET","params":{}}, cls.__get_options__(), "PublicSearch.general")(query=query, country=country, keyword=keyword, count=count, offset=offset, **otherParams)
	
		@classmethod
		def users(cls, query: str = None, country: str = None, keyword: str = None, count: int = Default(30), offset: int = None, **otherParams) -> APIResponse:
			'''
				Search TikTok users 
			'''
			count = None if count is cls.users.__defaults__[3] else count
			return wrap({"path":"/public/search/users","help":"Search TikTok users","method":"GET","params":{}}, cls.__get_options__(), "PublicSearch.users")(query=query, country=country, keyword=keyword, count=count, offset=offset, **otherParams)
	
		@classmethod
		def videos(cls, query: str = None, country: str = None, keyword: str = None, count: int = Default(30), offset: int = None, **otherParams) -> APIResponse:
			'''
				Search videos 
			'''
			count = None if count is cls.videos.__defaults__[3] else count
			return wrap({"path":"/public/search/videos","help":"Search videos","method":"GET","params":{}}, cls.__get_options__(), "PublicSearch.videos")(query=query, country=country, keyword=keyword, count=count, offset=offset, **otherParams)
	
		@classmethod
		def words(cls, query: str = None, country: str = None, keyword: str = None, count: int = Default(30), offset: int = None, **otherParams) -> APIResponse:
			'''
				Get keyword suggestions 
			'''
			count = None if count is cls.words.__defaults__[3] else count
			return wrap({"path":"/public/search/words","help":"Get keyword suggestions","method":"GET","params":{}}, cls.__get_options__(), "PublicSearch.words")(query=query, country=country, keyword=keyword, count=count, offset=offset, **otherParams)
	
	Rests.PublicSearch = PublicSearch
	class Public(Rests.BaseClass):
		'''
			Public endpoints do not require an authenticated user. 
		'''

		__options__ = {"headers":{},"params":{"country":{"required":False,"type":"string","example":"us","validate":"^[a-z]{,2}$"}},"values":{}}

		def __new__(self, country: str = None, **values) -> 'Public':
			'''
				Initialize new 'Public' instance with default values & options
			'''
			return super().__new__(self, country=country, **values)

		@classmethod
		def _set(self, country: str = None, **values) -> 'Public':
			'''
				Set default values & options for 'Public'
				Method works only root category.
			'''
			return super()._set(country=country, **values)
	
		@classmethod
		def user(cls, username: str = None, secUid: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get a user's profile information 
			'''
			
			return wrap({"path":"/public/check","help":"Get a user's profile information","params":{"username":{"help":"The TikTok account username","validate":"^([a-zA-Z0-9_.]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","type":"string","required":True},"secUid":{"validate":"^(.*?){30,}$","help":"The TikTok user secUid.","type":"string","example":"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"}},"method":"GET"}, cls.__get_options__(), "Public.user")(username=username, secUid=secUid, country=country, **otherParams)
	
		@classmethod
		def explore(cls, count: int = Default(30), country: str = None, **otherParams) -> APIResponse:
			'''
				Get recommended posts (For You) 
			'''
			count = None if count is cls.explore.__defaults__[0] else count
			return wrap({"help":"Get recommended posts (For You)","path":"/public/explore","params":{"count":{"example":30,"default":30,"type":"number","validate":"^[0-9]{1,2}$"}},"method":"GET"}, cls.__get_options__(), "Public.explore")(count=count, country=country, **otherParams)
	
		@classmethod
		def posts(cls, secUid: str = None, count: int = Default(30), cursor: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get a user's feed posts 
			'''
			count = None if count is cls.posts.__defaults__[1] else count
			return wrap({"help":"Get a user's feed posts","path":"/public/posts","params":{"secUid":{"validate":"^(.*?){30,}$","help":"The TikTok user secUid.","type":"string","example":"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud","required":True},"count":{"example":30,"default":30,"type":"number","validate":"^[0-9]{1,2}$"},"cursor":{"help":"The starting point of the items list.","type":"string","validate":"^[0-9]+$"}},"method":"GET"}, cls.__get_options__(), "Public.posts")(secUid=secUid, count=count, cursor=cursor, country=country, **otherParams)
	
		@classmethod
		def likes(cls, secUid: str = None, count: int = Default(30), cursor: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get a user's liked posts 
			'''
			count = None if count is cls.likes.__defaults__[1] else count
			return wrap({"help":"Get a user's liked posts","path":"/public/likes","params":{"secUid":{"validate":"^(.*?){30,}$","help":"The TikTok user secUid.","type":"string","example":"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud","required":True},"count":{"example":30,"default":30,"type":"number","validate":"^[0-9]{1,2}$"},"cursor":{"help":"The starting point of the items list.","type":"string","validate":"^[0-9]+$"}},"method":"GET"}, cls.__get_options__(), "Public.likes")(secUid=secUid, count=count, cursor=cursor, country=country, **otherParams)
	
		@classmethod
		def video(cls, id: str = None, username: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get video information 
			'''
			
			return wrap({"path":"/public/video","help":"Get video information","params":{"id":{"help":"The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).","example":"6950501241915018501","type":"string","validate":"^([0-9]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","required":True},"username":{"help":"The TikTok account username","validate":"^([a-zA-Z0-9_.]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","type":"string"}},"method":"GET"}, cls.__get_options__(), "Public.video")(id=id, username=username, country=country, **otherParams)
	
		discover = Rests.PublicDiscover
		@classmethod
		def hashtag(cls, count: int = Default(30), id: str = None, name: str = None, cursor: str = None, country: str = None, keyword: str = None, offset: int = None, **otherParams) -> APIResponse:
			'''
				Get posts by hashtag ID. Your first request should be using the `name` parameter, the following requests should be using the `id` parameter which you have stored from the first request. 
			'''
			count = None if count is cls.hashtag.__defaults__[0] else count
			return wrap({"help":"Get posts by hashtag ID. Your first request should be using the `name` parameter, the following requests should be using the `id` parameter which you have stored from the first request.","path":"/public/hashtag","params":{"id":{"validate":"^([0-9]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","type":"string","help":"The hashtag ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)"},"name":{"type":"string","help":"The hashtag name"},"count":{"example":30,"default":30,"type":"number","validate":"^[0-9]{1,2}$"},"cursor":{"help":"The starting point of the items list.","type":"string","validate":"^[0-9]+$"}},"method":"GET"}, cls.__get_options__(), "Public.hashtag")(count=count, id=id, name=name, cursor=cursor, country=country, keyword=keyword, offset=offset, **otherParams)
	
		@classmethod
		def music(cls, id: str = None, count: int = Default(30), cursor: str = None, country: str = None, keyword: str = None, offset: int = None, **otherParams) -> APIResponse:
			'''
				Get posts by music ID 
			'''
			count = None if count is cls.music.__defaults__[1] else count
			return wrap({"help":"Get posts by music ID","path":"/public/music","params":{"id":{"validate":"^([0-9]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","type":"string","help":"The music ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)","required":True},"count":{"example":30,"default":30,"type":"number","validate":"^[0-9]{1,2}$"},"cursor":{"help":"The starting point of the items list.","type":"string","validate":"^[0-9]+$"}},"method":"GET"}, cls.__get_options__(), "Public.music")(id=id, count=count, cursor=cursor, country=country, keyword=keyword, offset=offset, **otherParams)
	
		@classmethod
		def musicInfo(cls, id: str = None, country: str = None, keyword: str = None, count: int = Default(30), offset: int = None, **otherParams) -> APIResponse:
			'''
				Get music information 
			'''
			count = None if count is cls.musicInfo.__defaults__[3] else count
			return wrap({"help":"Get music information","path":"/public/music/info","params":{"id":{"validate":"^([0-9]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","type":"string","help":"The music ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)","required":True}},"method":"GET"}, cls.__get_options__(), "Public.musicInfo")(id=id, country=country, keyword=keyword, count=count, offset=offset, **otherParams)
	
		search = Rests.PublicSearch
	Rests.Public = Public
	class UserPostsComments(Rests.BaseClass):
		'''
			Comments Endpoints Category 
		'''

		__options__ = {"headers":{},"params":{"country":{"required":False,"type":"string","example":"us","validate":"^[a-z]{,2}$"},"accountKey":{"name":"X-ACCOUNT-KEY","required":True,"help":"The Account Key is required.","location":"headers","validate":"^[a-zA-Z0-9]{10,}$","example":"myAccountKey","$tshide":True}},"values":{}}

		def __new__(self, **values) -> 'UserPostsComments':
			'''
				Initialize new 'UserPostsComments' instance with default values & options
			'''
			return super().__new__(self, **values)

		@classmethod
		def _set(self, **values) -> 'UserPostsComments':
			'''
				Set default values & options for 'UserPostsComments'
				Method works only root category.
			'''
			return super()._set(**values)
	
		@classmethod
		def list(cls, media_id: str = None, count: int = Default(30), cursor: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get a video comments list 
			'''
			count = None if count is cls.list.__defaults__[1] else count
			return wrap({"help":"Get a video comments list","path":"/comment/list","params":{"media_id":{"help":"The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).","example":"6950501241915018501","type":"string","validate":"^([0-9]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","required":True},"count":{"example":30,"default":30,"type":"number","validate":"^[0-9]{1,2}$"},"cursor":{"help":"The starting point of the items list.","type":"string","validate":"^[0-9]+$"}},"method":"GET"}, cls.__get_options__(), "UserPostsComments.list")(media_id=media_id, count=count, cursor=cursor, country=country, **otherParams)
	
		@classmethod
		def replies(cls, media_id: str = None, comment_id: str = None, count: int = Default(30), country: str = None, **otherParams) -> APIResponse:
			'''
				Get a comment reply list 
			'''
			count = None if count is cls.replies.__defaults__[2] else count
			return wrap({"help":"Get a comment reply list","path":"/comment/reply/list","params":{"media_id":{"help":"The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).","example":"6950501241915018501","type":"string","validate":"^([0-9]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","required":True},"comment_id":{"validate":"^[0-9]+$","help":"The comment ID","type":"string","example":"6950502632121548805","required":True},"count":{"example":30,"default":30,"type":"number","validate":"^[0-9]{1,2}$"}},"method":"GET"}, cls.__get_options__(), "UserPostsComments.replies")(media_id=media_id, comment_id=comment_id, count=count, country=country, **otherParams)
	
		@classmethod
		def post(cls, media_id: str = None, text = None, reply_comment_id = None, has_tags: bool = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Post a new comment 
			'''
			
			return wrap({"path":"/user/comment","method":"POST","enctype":"json","help":"Post a new comment","params":{"media_id":{"help":"The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).","example":"6950501241915018501","type":"string","validate":"^([0-9]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","required":True},"text":{"required":True,"example":"That's cool"},"reply_comment_id":{"validate":"^[0-9]+$","help":"You can reply to a comment by including a comment ID"},"has_tags":{"type":"boolean"}}}, cls.__get_options__(), "UserPostsComments.post")(media_id=media_id, text=text, reply_comment_id=reply_comment_id, has_tags=has_tags, country=country, **otherParams)
	
		@classmethod
		def like(cls, media_id: str = None, comment_id: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Like a comment 
			'''
			
			return wrap({"help":"Like a comment","path":"/user/comment/like","method":"POST","enctype":"json","params":{"media_id":{"help":"The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).","example":"6950501241915018501","type":"string","validate":"^([0-9]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","required":True},"comment_id":{"validate":"^[0-9]+$","help":"The comment ID","type":"string","example":"6950502632121548805","required":True}}}, cls.__get_options__(), "UserPostsComments.like")(media_id=media_id, comment_id=comment_id, country=country, **otherParams)
	
		@classmethod
		def unlike(cls, media_id: str = None, comment_id: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Unlike a comment 
			'''
			
			return wrap({"help":"Unlike a comment","path":"/user/comment/unlike","method":"POST","enctype":"json","params":{"media_id":{"help":"The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).","example":"6950501241915018501","type":"string","validate":"^([0-9]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","required":True},"comment_id":{"validate":"^[0-9]+$","help":"The comment ID","type":"string","example":"6950502632121548805","required":True}}}, cls.__get_options__(), "UserPostsComments.unlike")(media_id=media_id, comment_id=comment_id, country=country, **otherParams)
	
	Rests.UserPostsComments = UserPostsComments
	class UserPosts(Rests.BaseClass):
		'''
			Posts Endpoints Category 
		'''

		__options__ = {"headers":{},"params":{"country":{"required":False,"type":"string","example":"us","validate":"^[a-z]{,2}$"},"accountKey":{"name":"X-ACCOUNT-KEY","required":True,"help":"The Account Key is required.","location":"headers","validate":"^[a-zA-Z0-9]{10,}$","example":"myAccountKey","$tshide":True}},"values":{}}

		def __new__(self, **values) -> 'UserPosts':
			'''
				Initialize new 'UserPosts' instance with default values & options
			'''
			return super().__new__(self, **values)

		@classmethod
		def _set(self, **values) -> 'UserPosts':
			'''
				Set default values & options for 'UserPosts'
				Method works only root category.
			'''
			return super()._set(**values)
	
		@classmethod
		def info(cls, id: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get video information 
			'''
			
			return wrap({"help":"Get video information","path":"/user/video","params":{"id":{"help":"The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).","example":"6950501241915018501","type":"string","validate":"^([0-9]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","required":True}},"method":"GET"}, cls.__get_options__(), "UserPosts.info")(id=id, country=country, **otherParams)
	
		@classmethod
		def like(cls, media_id: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Like a video 
			'''
			
			return wrap({"help":"Like a video","path":"/user/like","method":"POST","enctype":"json","params":{"media_id":{"help":"The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).","example":"6950501241915018501","type":"string","validate":"^([0-9]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","required":True}}}, cls.__get_options__(), "UserPosts.like")(media_id=media_id, country=country, **otherParams)
	
		@classmethod
		def unlike(cls, media_id: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Unlike a video 
			'''
			
			return wrap({"help":"Unlike a video","path":"/user/like","method":"POST","enctype":"json","params":{"media_id":{"help":"The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).","example":"6950501241915018501","type":"string","validate":"^([0-9]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","required":True}}}, cls.__get_options__(), "UserPosts.unlike")(media_id=media_id, country=country, **otherParams)
	
		comments = Rests.UserPostsComments
	Rests.UserPosts = UserPosts
	class UserLive(Rests.BaseClass):
		'''
			Live Endpoints Category 
		'''

		__options__ = {"headers":{},"params":{"country":{"required":False,"type":"string","example":"us","validate":"^[a-z]{,2}$"},"accountKey":{"name":"X-ACCOUNT-KEY","required":True,"help":"The Account Key is required.","location":"headers","validate":"^[a-zA-Z0-9]{10,}$","example":"myAccountKey","$tshide":True}},"values":{}}

		def __new__(self, **values) -> 'UserLive':
			'''
				Initialize new 'UserLive' instance with default values & options
			'''
			return super().__new__(self, **values)

		@classmethod
		def _set(self, **values) -> 'UserLive':
			'''
				Set default values & options for 'UserLive'
				Method works only root category.
			'''
			return super()._set(**values)
	
		@classmethod
		def start(cls, title = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Start a live video 
			'''
			
			return wrap({"help":"Start a live video","path":"/user/live/start","method":"POST","enctype":"json","params":{"title":{"required":True,"example":"Check out my live!"}}}, cls.__get_options__(), "UserLive.start")(title=title, country=country, **otherParams)
	
		@classmethod
		def stop(cls, country: str = None, **otherParams) -> APIResponse:
			'''
				Stop a live video 
			'''
			
			return wrap({"help":"Stop a live video","path":"/user/live/stop","method":"POST","enctype":"json","params":{}}, cls.__get_options__(), "UserLive.stop")(country=country, **otherParams)
	
		@classmethod
		def info(cls, room_id: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get a live video information 
			'''
			
			return wrap({"help":"Get a live video information","path":"/user/live/check","params":{"room_id":{"required":True,"type":"string"}},"method":"GET"}, cls.__get_options__(), "UserLive.info")(room_id=room_id, country=country, **otherParams)
	
		@classmethod
		def recommend(cls, room_id: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get recommended live videos based on a live video 
			'''
			
			return wrap({"help":"Get recommended live videos based on a live video","path":"/user/live/recommend","params":{"room_id":{"required":True,"type":"string"}},"method":"GET"}, cls.__get_options__(), "UserLive.recommend")(room_id=room_id, country=country, **otherParams)
	
		@classmethod
		def stats(cls, room_id: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get a ended live video statistics 
			'''
			
			return wrap({"help":"Get a ended live video statistics","path":"/user/live/stats","params":{"room_id":{"required":True,"type":"string"}},"method":"GET"}, cls.__get_options__(), "UserLive.stats")(room_id=room_id, country=country, **otherParams)
	
		@classmethod
		def enter(cls, room_id: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Enter a live video and get information 
			'''
			
			return wrap({"help":"Enter a live video and get information","path":"/user/live/enter","params":{"room_id":{"required":True,"type":"string"}},"method":"GET"}, cls.__get_options__(), "UserLive.enter")(room_id=room_id, country=country, **otherParams)
	
	Rests.UserLive = UserLive
	class UserAnalytics(Rests.BaseClass):
		'''
			Analytics Endpoints Category 
		'''

		__options__ = {"headers":{},"params":{"country":{"required":False,"type":"string","example":"us","validate":"^[a-z]{,2}$"},"accountKey":{"name":"X-ACCOUNT-KEY","required":True,"help":"The Account Key is required.","location":"headers","validate":"^[a-zA-Z0-9]{10,}$","example":"myAccountKey","$tshide":True},"days":{"default":7,"validate":"^[0-9]+$"}},"values":{}}

		def __new__(self, days = None, **values) -> 'UserAnalytics':
			'''
				Initialize new 'UserAnalytics' instance with default values & options
			'''
			return super().__new__(self, days=days, **values)

		@classmethod
		def _set(self, days = None, **values) -> 'UserAnalytics':
			'''
				Set default values & options for 'UserAnalytics'
				Method works only root category.
			'''
			return super()._set(days=days, **values)
	
		@classmethod
		def overview(cls, country: str = None, days = Default(7), **otherParams) -> APIResponse:
			'''
				Overview - GET request 
			'''
			days = None if days is cls.overview.__defaults__[1] else days
			return wrap({"path":"/creator/analytics/overview","method":"GET","params":{}}, cls.__get_options__(), "UserAnalytics.overview")(country=country, days=days, **otherParams)
	
		@classmethod
		def content(cls, country: str = None, days = Default(7), **otherParams) -> APIResponse:
			'''
				Content - GET request 
			'''
			days = None if days is cls.content.__defaults__[1] else days
			return wrap({"path":"/creator/analytics/content","method":"GET","params":{}}, cls.__get_options__(), "UserAnalytics.content")(country=country, days=days, **otherParams)
	
		@classmethod
		def followers(cls, country: str = None, days = Default(7), **otherParams) -> APIResponse:
			'''
				Followers - GET request 
			'''
			days = None if days is cls.followers.__defaults__[1] else days
			return wrap({"path":"/creator/analytics/followers","method":"GET","params":{}}, cls.__get_options__(), "UserAnalytics.followers")(country=country, days=days, **otherParams)
	
		@classmethod
		def video(cls, media_id = None, country: str = None, days = Default(7), **otherParams) -> APIResponse:
			'''
				Video - GET request 
			'''
			days = None if days is cls.video.__defaults__[2] else days
			return wrap({"path":"/creator/analytics/video","params":{"media_id":{"required":True,"validate":"^[0-9]+$"}},"method":"GET"}, cls.__get_options__(), "UserAnalytics.video")(media_id=media_id, country=country, days=days, **otherParams)
	
		@classmethod
		def live(cls, country: str = None, days = Default(7), **otherParams) -> APIResponse:
			'''
				Live - GET request 
			'''
			days = None if days is cls.live.__defaults__[1] else days
			return wrap({"path":"/creator/analytics/live","method":"GET","params":{}}, cls.__get_options__(), "UserAnalytics.live")(country=country, days=days, **otherParams)
	
	Rests.UserAnalytics = UserAnalytics
	class User(Rests.BaseClass):
		'''
			User Endpoints Category 
		'''

		__options__ = {"headers":{},"params":{"country":{"required":False,"type":"string","example":"us","validate":"^[a-z]{,2}$"},"accountKey":{"name":"X-ACCOUNT-KEY","required":True,"help":"The Account Key is required.","location":"headers","validate":"^[a-zA-Z0-9]{10,}$","example":"myAccountKey","$tshide":True}},"values":{}}

		def __new__(self, accountKey = None, **values) -> 'User':
			'''
				Initialize new 'User' instance with default values & options
			'''
			return super().__new__(self, accountKey=accountKey, **values)

		@classmethod
		def _set(self, accountKey = None, **values) -> 'User':
			'''
				Set default values & options for 'User'
				Method works only root category.
			'''
			return super()._set(accountKey=accountKey, **values)
	
		@classmethod
		def info(cls, country: str = None, **otherParams) -> APIResponse:
			'''
				Get current user profile information 
			'''
			
			return wrap({"help":"Get current user profile information","path":"/user/info","method":"GET","params":{}}, cls.__get_options__(), "User.info")(country=country, **otherParams)
	
		@classmethod
		def edit(cls, nickname = None, username = None, bio = None, privacy = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Edit the user profile 
			'''
			
			return wrap({"help":"Edit the user profile","path":"/user/edit","method":"POST","enctype":"json","params":{"nickname":{"example":False},"username":{"example":False},"bio":{"example":"My new bio"},"privacy":{"example":False,"validate":"^[0-1]$"}}}, cls.__get_options__(), "User.edit")(nickname=nickname, username=username, bio=bio, privacy=privacy, country=country, **otherParams)
	
		@classmethod
		def notifications(cls, filter = Default("all"), count: int = Default(30), max_time = None, min_time = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get user notifications 
			'''
			filter = None if filter is cls.notifications.__defaults__[0] else filter
			count = None if count is cls.notifications.__defaults__[1] else count
			return wrap({"help":"Get user notifications","path":"/user/notifications","params":{"filter":{"default":"all","in":["all","likes","comments","mentions","followers"]},"count":{"example":30,"default":30,"type":"number","validate":"^[0-9]{1,2}$"},"max_time":{"name":"max_time","validate":"^[0-9]+$"},"min_time":{"name":"min_time","validate":"^[0-9]+$"}},"method":"GET"}, cls.__get_options__(), "User.notifications")(filter=filter, count=count, max_time=max_time, min_time=min_time, country=country, **otherParams)
	
		@classmethod
		def following(cls, count: int = Default(30), cursor: int = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get following list 
			'''
			count = None if count is cls.following.__defaults__[0] else count
			return wrap({"help":"Get following list","path":"/user/following","params":{"count":{"example":30,"default":30,"type":"number","validate":"^[0-9]{1,2}$"},"cursor":{"help":"The starting point of the items list.","type":"number","validate":"^[0-9]+$"}},"method":"GET"}, cls.__get_options__(), "User.following")(count=count, cursor=cursor, country=country, **otherParams)
	
		@classmethod
		def follow(cls, username: str = None, user_id: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Follow an user 
			'''
			
			return wrap({"help":"Follow an user","path":"/user/follow","method":"POST","enctype":"json","params":{"username":{"help":"The TikTok account username","validate":"^([a-zA-Z0-9_.]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","type":"string","required":True},"user_id":{"help":"The TikTok user ID","type":"string","validate":"^[0-9]$","required":True}}}, cls.__get_options__(), "User.follow")(username=username, user_id=user_id, country=country, **otherParams)
	
		@classmethod
		def unfollow(cls, username: str = None, user_id: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Unfollows an user 
			'''
			
			return wrap({"help":"Unfollows an user","path":"/user/follow","method":"POST","enctype":"json","params":{"username":{"help":"The TikTok account username","validate":"^([a-zA-Z0-9_.]+|https?://vm.tiktok.com/[a-zA-Z0-9]+/?)$","type":"string","required":True},"user_id":{"help":"The TikTok user ID","type":"string","validate":"^[0-9]$","required":True}}}, cls.__get_options__(), "User.unfollow")(username=username, user_id=user_id, country=country, **otherParams)
	
		@classmethod
		def feed(cls, count: int = Default(30), cursor: str = None, secUid: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get current user feed posts, or someone elses by providing the `secUid` parameter. 
			'''
			count = None if count is cls.feed.__defaults__[0] else count
			return wrap({"help":"Get current user feed posts, or someone elses by providing the `secUid` parameter.","path":"/user/feed","params":{"count":{"example":30,"default":30,"type":"number","validate":"^[0-9]{1,2}$"},"cursor":{"help":"The starting point of the items list.","type":"string","validate":"^[0-9]+$"},"secUid":{"validate":"^(.*?){30,}$","help":"The TikTok user secUid.","type":"string","example":"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"}},"method":"GET"}, cls.__get_options__(), "User.feed")(count=count, cursor=cursor, secUid=secUid, country=country, **otherParams)
	
		@classmethod
		def likes(cls, count: int = Default(30), secUid: str = None, cursor: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get user liked posts 
			'''
			count = None if count is cls.likes.__defaults__[0] else count
			return wrap({"help":"Get user liked posts","path":"/user/likes","params":{"count":{"example":30,"default":30,"type":"number","validate":"^[0-9]{1,2}$"},"secUid":{"validate":"^(.*?){30,}$","help":"The TikTok user secUid.","type":"string","example":"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"},"cursor":{"help":"The starting point of the items list.","type":"string","validate":"^[0-9]+$"}},"method":"GET"}, cls.__get_options__(), "User.likes")(count=count, secUid=secUid, cursor=cursor, country=country, **otherParams)
	
		@classmethod
		def explore(cls, count: int = Default(30), country: str = None, **otherParams) -> APIResponse:
			'''
				Get recommended posts 
			'''
			count = None if count is cls.explore.__defaults__[0] else count
			return wrap({"help":"Get recommended posts","path":"/user/explore","params":{"count":{"example":30,"default":30,"type":"number","validate":"^[0-9]{1,2}$"}},"method":"GET"}, cls.__get_options__(), "User.explore")(count=count, country=country, **otherParams)
	
		posts = Rests.UserPosts
		@classmethod
		def conversations(cls, cursor: str = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get user conversations 
			'''
			
			return wrap({"path":"/user/conversations","help":"Get user conversations","params":{"cursor":{"help":"The starting point of the items list.","type":"string","validate":"^[0-9]+$"}},"method":"GET"}, cls.__get_options__(), "User.conversations")(cursor=cursor, country=country, **otherParams)
	
		@classmethod
		def messages(cls, conversationId = None, conversationShortId = None, cursor: str = None, limit = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Get user messages 
			'''
			
			return wrap({"path":"/user/messages","help":"Get user messages","params":{"conversationId":{"required":True},"conversationShortId":{"required":True},"cursor":{"help":"The starting point of the items list.","type":"string","validate":"^[0-9]+$"},"limit":{"validate":"^[0-9]{1,2}$"}},"method":"GET"}, cls.__get_options__(), "User.messages")(conversationId=conversationId, conversationShortId=conversationShortId, cursor=cursor, limit=limit, country=country, **otherParams)
	
		live = Rests.UserLive
		@classmethod
		def search(cls, query = None, country: str = None, **otherParams) -> APIResponse:
			'''
				Search for users 
			'''
			
			return wrap({"help":"Search for users","path":"/user/search","params":{"query":{"required":True,"example":"lilyachty"}},"method":"GET"}, cls.__get_options__(), "User.search")(query=query, country=country, **otherParams)
	
		analytics = Rests.UserAnalytics
	Rests.User = User
	class API(Rests.BaseClass):
		

		__options__ = {}

		def __new__(self, apiKey = None, **values) -> 'API':
			'''
				Initialize new instance with default values & options for all requests
			'''
			return super().__new__(self, apiKey=apiKey, **values)

		@classmethod
		def _set(self, apiKey = None, **values) -> 'API':
			'''
				Set default values & options for 'API'
				Method works only root category.
			'''
			return super()._set(apiKey=apiKey, **values)
	
		public = Rests.Public
		user = Rests.User
		__Rests__ = Rests
	Rests.API = API
	return API