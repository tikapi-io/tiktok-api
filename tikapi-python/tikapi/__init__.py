from urllib import response
from requests import request
import requests
from tikapi.api import Rests, APIException, ResponseException, ValidationException



def TikAPI(apiKey: str):
	if not isinstance(apiKey, str):
		raise APIException("API Key is required.")

	def on_success(response: requests.Response, request: dict):
		'''
			A convenient method to get the next batch of items, if the endpoint has iteration parameters (e.g cursor)
		'''
		def next_items():
			body: dict = {}

			try:
				body = response.json()
			except:
				return None

			nextCursorParams = {}

			if body.get("hasMore"):
				nextCursor = body.get("offset", body.get("cursor"))
				if not nextCursor:
					return None
				
				nextCursorParams = {
					'cursor': nextCursor,
					'offset': nextCursor
				}
			
			elif body.get('notice_lists'):
				notice_lists = body.get('notice_lists')

				if not isinstance(notice_lists, (list, tuple)) or not len(notice_lists):
					return None
				
				notice_body = notice_lists[0]

				if not notice_body.get('has_more'):
					return None

				minTime = notice_body.get('min_time') 
				maxTime = notice_body.get('max_time')

				
				if not minTime or not maxTime:
					return None

				nextCursorParams = {
					'min_time': minTime,
					'max_time': maxTime
				}
				 
			else:
				return None

			return request.get('self')(**{
				**request.get('params', {}),
				**nextCursorParams
			})


		setattr(response, 'next_items', next_items)
			


	def on_error(error, request:dict):
		
		if hasattr(error, 'response'):
			message = str(error)

			try:
				message = error.response.json().get("message", str(error))
			except Exception as e:
				pass

			exception = ResponseException(message)

			exception.response = error.response

			raise exception

	instance = Rests({
		'values': {
			'apiKey': apiKey
		},
		'on_success': on_success,
		'on_error': on_error
	})

	return instance

__all__ = ['TikAPI', 'APIException', 'ResponseException', 'ValidateException']