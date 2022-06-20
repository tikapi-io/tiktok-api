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
	
	global_options = {}

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


