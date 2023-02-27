//4 Spaces
export const ident = '    '; 


/**
 * Code Samples Generation Templates
 */
export const jsCodeSample = ({
	packageName,
	initsJs,
	requestKey,
	requestParamsJs
})=>{
	initsJs[0] = `const api = TikAPI("myAPIKey");`;
	return (
`import TikAPI from '${packageName}';

${initsJs.join('\n')}

(async function(){
${ident}try{
${ident}${ident}let response = await ${requestKey}(${requestParamsJs});
${ident}${ident}console.log(response.json);
${ident}}
${ident}catch(err){
${ident}${ident}console.log(err?.statusCode, err?.message, err?.json)
${ident}}	
})();`

);

};

export const pyCodeSample = ({
	packageName,
	initsPy,
	requestKey,
	requestParamsPy
})=>{
	initsPy[0] = `api = TikAPI("myAPIKey")`;

	return (
`from ${packageName} import TikAPI, ValidationException, ResponseException

${initsPy.join('\n')}

try:
${ident}response = ${requestKey}(${requestParamsPy})

${ident}print(response.json())

except ValidationException as e:
${ident}print(e, e.field)

except ResponseException as e:
${ident}print(e, e.response.status_code)
`);
}


/**
 * Code Samples for endpoints that have Iteration parameters
 */
export const iterationCodeSamples = (parameter="cursor")=>{

	const jsCodeSample = ({
		packageName,
		initsJs,
		requestKey,
		requestParamsJs
	})=>{
		initsJs[0] = `const api = TikAPI("myAPIKey");`;

		return (
`import TikAPI from '${packageName}';

${initsJs.join('\n')}

(async function(){
${ident}try{
${ident}${ident}let response = await ${requestKey}(${requestParamsJs});

${ident}${ident}console.log(response?.json);

${ident}${ident}while(response){

${ident}${ident}${ident}let ${parameter} = response?.json?.${parameter};
${ident}${ident}${ident}console.log("Getting next items ", ${parameter});

${ident}${ident}${ident}response = await Promise.resolve(
${ident}${ident}${ident}${ident}response?.nextItems()
${ident}${ident}${ident});
${ident}${ident}}
${ident}}
${ident}catch(err){
${ident}${ident}console.log(err?.statusCode, err?.message, err?.json)
${ident}}	
})();`
);	
};

const pyCodeSample = ({
	packageName,
	initsPy,
	requestKey,
	requestParamsPy
})=>{
	initsPy[0] = `api = TikAPI("myAPIKey")`;

	return (
`from ${packageName} import TikAPI, ValidationException, ResponseException

${initsPy.join('\n')}

try:
${ident}response = ${requestKey}(${requestParamsPy})

${ident}print(response.json())

${ident}while(response):
${ident}${ident}${parameter} = response.json().get('${parameter}')
${ident}${ident}print("Getting next items ", ${parameter})
${ident}${ident}response = response.next_items()

except ValidationException as e:
${ident}print(e, e.field)

except ResponseException as e:
${ident}print(e, e.response.status_code)
`);
};

	return {
		jsTemplate: jsCodeSample,
		pyTemplate: pyCodeSample
	}
}


/**
 * Hashtag Code Samples
 */
export const hashtagCodeSamples = (parameter="cursor")=>{

	const jsCodeSample = ({
		packageName,
		initsJs,
		requestKey,
		requestParamsJs
	})=>{
		initsJs[0] = `const api = TikAPI("myAPIKey");`;

		return (
`import TikAPI from '${packageName}';

${initsJs.join('\n')}

(async function(){
${ident}try{
${ident}${ident}let response = await api.public.hashtag({
${ident}${ident}${ident}name: "lilyachty"
${ident}${ident}});

${ident}${ident}let hashtagId = response.json.challengeInfo.challenge.id;

${ident}${ident}let response = await api.public.hashtag({
${ident}${ident}${ident}id: hashtagId
${ident}${ident}});

${ident}${ident}console.log(response?.json);

${ident}${ident}while(response){
${ident}${ident}${ident}let ${parameter} = response?.json?.${parameter};
${ident}${ident}${ident}console.log("Getting next items ", ${parameter});

${ident}${ident}${ident}response = await Promise.resolve(
${ident}${ident}${ident}${ident}response?.nextItems()
${ident}${ident}${ident});
${ident}${ident}}
${ident}}
${ident}catch(err){
${ident}${ident}console.log(err?.statusCode, err?.message, err?.json)
${ident}}	
})();`
);	
};

const pyCodeSample = ({
	packageName,
	initsPy,
	requestKey,
	requestParamsPy
})=>{
	initsPy[0] = `api = TikAPI("myAPIKey")`;

	return (
`from ${packageName} import TikAPI, ValidationException, ResponseException

${initsPy.join('\n')}

try:
${ident}response = api.public.hashtag(
${ident}${ident}name="lilyachty"
${ident})

${ident}hashtagId = response.json()['challengeInfo']['challenge']['id']

${ident}response = api.public.hashtag(
${ident}${ident}id=hashtagId
${ident})

${ident}print(response.json())

${ident}while(response):
${ident}${ident}${parameter} = response.json().get('${parameter}')
${ident}${ident}print("Getting next items ", ${parameter})
${ident}${ident}response = response.next_items()

except ValidationException as e:
${ident}print(e, e.field)

except ResponseException as e:
${ident}print(e, e.response.status_code)
`);
};

	return {
		jsTemplate: jsCodeSample,
		pyTemplate: pyCodeSample
	}
}


/**
 * Explore Code Samples
 */
export const exploreCodeSamples = ()=>{

	const jsCodeSample = ({
		packageName,
		initsJs,
		requestKey,
		requestParamsJs
	})=>{
		initsJs[0] = `const api = TikAPI("myAPIKey");`;

		return (
`import TikAPI from '${packageName}';

${initsJs.join('\n')}

(async function(){
${ident}try{
${ident}${ident}let response = await api.public.explore({
${ident}${ident}${ident}session_id: 0,
${ident}${ident}${ident}country: 'us'
${ident}${ident}});
${ident}${ident}console.log(response.json);
${ident}}
${ident}catch(err){
${ident}${ident}console.log(err?.statusCode, err?.message, err?.json)
${ident}}	
})();`
);	
};

const pyCodeSample = ({
	packageName,
	initsPy,
	requestKey,
	requestParamsPy
})=>{
	initsPy[0] = `api = TikAPI("myAPIKey")`;

	return (
`from ${packageName} import TikAPI, ValidationException, ResponseException

${initsPy.join('\n')}

try:
${ident}response = api.public.explore(
${ident}${ident}session_id='0',
${ident}${ident}country='us'
${ident})

${ident}print(response.json())

except ValidationException as e:
${ident}print(e, e.field)

except ResponseException as e:
${ident}print(e, e.response.status_code)
`);
};

	return {
		jsTemplate: jsCodeSample,
		pyTemplate: pyCodeSample
	}
}