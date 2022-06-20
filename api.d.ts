/*!
 * Made with Rests
 * github.com/el1s7/rests
 */

type json = 
 			| string
 			| number
 			| boolean
 			| null
 			| json[]
 			| {[key: string]: json};
	
interface FormData {
	[Symbol.iterator](): IterableIterator<[string, File | string]>;
	/** Returns an array of key, value pairs for every entry in the list. */
	entries(): IterableIterator<[string, File | string]>;
	/** Returns a list of keys in the list. */
	keys(): IterableIterator<string>;
	/** Returns a list of values in the list. */
	values(): IterableIterator<File | string>;
}

interface ResponseObject {
	statusCode: number,
	statusText: string,
	headers: any,
	type: "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect" ,
	ok: boolean,
	json?: any,
	text?: string,
	formData?: any,
	blob?: Blob,
	message?: string
}

type HookRequest = {
	/**
	 * Fetch URL
	 */
	url: string, 

	/**
	 * Fetch Options
	 */
	options: any,
	
	/**
	 * The parameters supplied for this request
	 */
	 params: any

	/**
	 * Rests instance
	 */
	instance: any

	/**
	 * Endpoint Key, e.g "user.login"
	 */
	key: string
};

interface Hooks {
	/**
	 * A global hook function that is called on request.
	 * 
	 */
	on_request?: (request: HookRequest) => any,

	/**
	 * A hook function that is called on successful response, you can also modify and return a different response.
	 */
	 on_success?: (response: ResponseObject, request?: HookRequest) => any,
	
	/**
	 * A hook function that is called on errors.
	 * 
	 * 
	 * To return a different error:
	 */
	
	on_error?: (error: ResponseObject | unknown, request?: HookRequest) => any,
}

interface Params {
	[name: string]:{
		/** The parameter HTTP name */
		name?: string,
		
		/** Required or not */
		required?: boolean,

		/** A help message to throw in case of errors */
		help?: string,

		/** Param type (default: any)*/
		type?: "string" | "number" | "array" | "object" | "boolean" | "any",

		/** Example value */
		example?: any,

		/** Format functions that accepts supplied value and returns formatted value. */
		format?: (value: any)=>any,

		/** Regex validation */
		validate?: RegExp | string,

		/** Array validation */
		in?: any[],

		/** Default value */
		default?: any,

		/** HTTP Location */
		location?: "body" | "headers" | "query" | "path",

	}
}

interface Options extends Hooks {
	base?: string,

	headers?: any,

	params?: Params,
	
	/**
	 * Set default values for parameters
	 */
	 values?: {
		[param_name: string]: any
	}

	/**
	 * Node-Fetch option for adding a proxy
	 */
	fetch_agent?: any, 
}

interface newCategoryOptions {
	/**
	 * Override global options for this category
	 */
	$options: Options;
}

interface newCategoryWithOptions extends newCategoryOptions {
	[param: string]: any | Options;
}

type newCategoryValues = {
	[param: string]: any
} | newCategoryWithOptions;



declare class HideFuncProps<T>{
	private name;
	private apply;
	private bind;
	private arguments;
	private call;
	private caller;
	private length;
	private prototype;
	private toString;
	//public set: (values: newCategoryValues) => T;
}


interface updateOptions<X> extends HideFuncProps<X>{
	set: (values: newCategoryValues) => X
}

interface newCategory<T> extends HideFuncProps<T> {
	new(values: newCategoryValues): T & updateOptions<T>;
}

export interface APIPublicDiscover extends newCategory<APIPublicDiscover> {

	/**
	 * Users - GET request 
	 */
	users: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * Discover keyword is optional	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	keyword?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting offset of items list. 
	 */
	offset?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Music - GET request 
	 */
	music: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * Discover keyword is optional	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	keyword?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting offset of items list. 
	 */
	offset?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Hashtag - GET request 
	 */
	hashtag: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * Discover keyword is optional	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	keyword?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting offset of items list. 
	 */
	offset?: number
	
} | FormData) => Promise<ResponseObject>;

}

export interface APIPublicSearch extends newCategory<APIPublicSearch> {

	/**
	 * Search anything 
	 */
	general: (params: {
	/**
	 * The search keyword 
	 */
	query?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * Discover keyword is optional	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	keyword?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting offset of items list. 
	 */
	offset?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Search TikTok users 
	 */
	users: (params: {
	/**
	 * The search keyword 
	 */
	query?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * Discover keyword is optional	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	keyword?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting offset of items list. 
	 */
	offset?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Search videos 
	 */
	videos: (params: {
	/**
	 * The search keyword 
	 */
	query?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * Discover keyword is optional	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	keyword?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting offset of items list. 
	 */
	offset?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get keyword suggestions 
	 */
	words: (params: {
	/**
	 * The search keyword 
	 */
	query?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * Discover keyword is optional	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	keyword?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting offset of items list. 
	 */
	offset?: number
	
} | FormData) => Promise<ResponseObject>;

}

export interface APIPublic extends newCategory<APIPublic> {

	/**
	 * Get a user's profile information 
	 */
	user: (params: {
	/**
	 * The TikTok account username 
	 */
	username?: string
	

	/**
	 * The TikTok user secUid.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get recommended posts (For You) 
	 */
	explore: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a user's feed posts 
	 */
	posts: (params: {
	/**
	 * The TikTok user secUid.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. 
	 */
	cursor?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a user's liked posts 
	 */
	likes: (params: {
	/**
	 * The TikTok user secUid.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. 
	 */
	cursor?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get video information 
	 */
	video: (params: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).	
	 * 
	 * @example
	 * 
	 * `"6950501241915018501"`
	 * 						 
	 */
	id?: string
	

	/**
	 * The TikTok account username 
	 */
	username?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;

	/**
	 * Public endpoints do not require an authenticated user. 
	 */
	discover: APIPublicDiscover


	/**
	 * Get posts by hashtag ID. Your first request should be using the `name` parameter, the following requests should be using the `id` parameter which you have stored from the first request. 
	 */
	hashtag: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The hashtag ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU) 
	 */
	id?: string
	

	/**
	 * The hashtag name 
	 */
	name?: string
	

	/**
	 * The starting point of the items list. 
	 */
	cursor?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * Discover keyword is optional	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	keyword?: string
	

	/**
	 * The starting offset of items list. 
	 */
	offset?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get posts by music ID 
	 */
	music: (params: {
	/**
	 * The music ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU) 
	 */
	id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. 
	 */
	cursor?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * Discover keyword is optional	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	keyword?: string
	

	/**
	 * The starting offset of items list. 
	 */
	offset?: number
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get music information 
	 */
	musicInfo: (params: {
	/**
	 * The music ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU) 
	 */
	id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * Discover keyword is optional	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	keyword?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting offset of items list. 
	 */
	offset?: number
	
} | FormData) => Promise<ResponseObject>;

	/**
	 * Public endpoints do not require an authenticated user. 
	 */
	search: APIPublicSearch

}

export interface APIUserPostsComments extends newCategory<APIUserPostsComments> {

	/**
	 * Get a video comments list 
	 */
	list: (params: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).	
	 * 
	 * @example
	 * 
	 * `"6950501241915018501"`
	 * 						 
	 */
	media_id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. 
	 */
	cursor?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a comment reply list 
	 */
	replies: (params: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).	
	 * 
	 * @example
	 * 
	 * `"6950501241915018501"`
	 * 						 
	 */
	media_id?: string
	

	/**
	 * The comment ID	
	 * 
	 * @example
	 * 
	 * `"6950502632121548805"`
	 * 						 
	 */
	comment_id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Post a new comment 
	 */
	post: (params: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).	
	 * 
	 * @example
	 * 
	 * `"6950501241915018501"`
	 * 						 
	 */
	media_id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"That's cool"`
	 * 						 
	 */
	text?: any
	

	/**
	 * You can reply to a comment by including a comment ID 
	 */
	reply_comment_id?: any
	

	/**
	 *  
	 */
	has_tags?: boolean
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Like a comment 
	 */
	like: (params: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).	
	 * 
	 * @example
	 * 
	 * `"6950501241915018501"`
	 * 						 
	 */
	media_id?: string
	

	/**
	 * The comment ID	
	 * 
	 * @example
	 * 
	 * `"6950502632121548805"`
	 * 						 
	 */
	comment_id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Unlike a comment 
	 */
	unlike: (params: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).	
	 * 
	 * @example
	 * 
	 * `"6950501241915018501"`
	 * 						 
	 */
	media_id?: string
	

	/**
	 * The comment ID	
	 * 
	 * @example
	 * 
	 * `"6950502632121548805"`
	 * 						 
	 */
	comment_id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;

}

export interface APIUserPosts extends newCategory<APIUserPosts> {

	/**
	 * Get video information 
	 */
	info: (params: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).	
	 * 
	 * @example
	 * 
	 * `"6950501241915018501"`
	 * 						 
	 */
	id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Like a video 
	 */
	like: (params: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).	
	 * 
	 * @example
	 * 
	 * `"6950501241915018501"`
	 * 						 
	 */
	media_id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Unlike a video 
	 */
	unlike: (params: {
	/**
	 * The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).	
	 * 
	 * @example
	 * 
	 * `"6950501241915018501"`
	 * 						 
	 */
	media_id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;

	/**
	 * Comments Endpoints Category 
	 */
	comments: APIUserPostsComments

}

export interface APIUserLive extends newCategory<APIUserLive> {

	/**
	 * Start a live video 
	 */
	start: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"Check out my live!"`
	 * 						 
	 */
	title?: any
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Stop a live video 
	 */
	stop: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a live video information 
	 */
	info: (params: {
	/**
	 *  
	 */
	room_id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get recommended live videos based on a live video 
	 */
	recommend: (params: {
	/**
	 *  
	 */
	room_id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get a ended live video statistics 
	 */
	stats: (params: {
	/**
	 *  
	 */
	room_id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Enter a live video and get information 
	 */
	enter: (params: {
	/**
	 *  
	 */
	room_id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;

}

export interface APIUserAnalytics extends newCategory<APIUserAnalytics> {

	/**
	 * Overview - GET request 
	 */
	overview: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `7`
	 * 						 
	 */
	days?: any
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Content - GET request 
	 */
	content: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `7`
	 * 						 
	 */
	days?: any
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Followers - GET request 
	 */
	followers: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `7`
	 * 						 
	 */
	days?: any
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Video - GET request 
	 */
	video: (params: {
	/**
	 *  
	 */
	media_id?: any
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `7`
	 * 						 
	 */
	days?: any
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Live - GET request 
	 */
	live: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `7`
	 * 						 
	 */
	days?: any
	
} | FormData) => Promise<ResponseObject>;

}

export interface APIUser extends newCategory<APIUser> {

	/**
	 * Get current user profile information 
	 */
	info: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Edit the user profile 
	 */
	edit: (params: {
	/**
	 *  
	 */
	nickname?: any
	

	/**
	 *  
	 */
	username?: any
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"My new bio"`
	 * 						 
	 */
	bio?: any
	

	/**
	 *  
	 */
	privacy?: any
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get user notifications 
	 */
	notifications: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"all"`
	 * 						 
	 */
	filter?: any
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 *  
	 */
	max_time?: any
	

	/**
	 *  
	 */
	min_time?: any
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get following list 
	 */
	following: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. 
	 */
	cursor?: number
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Follow an user 
	 */
	follow: (params: {
	/**
	 * The TikTok account username 
	 */
	username?: string
	

	/**
	 * The TikTok user ID 
	 */
	user_id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Unfollows an user 
	 */
	unfollow: (params: {
	/**
	 * The TikTok account username 
	 */
	username?: string
	

	/**
	 * The TikTok user ID 
	 */
	user_id?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get current user feed posts, or someone elses by providing the `secUid` parameter. 
	 */
	feed: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The starting point of the items list. 
	 */
	cursor?: string
	

	/**
	 * The TikTok user secUid.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get user liked posts 
	 */
	likes: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * The TikTok user secUid.	
	 * 
	 * @example
	 * 
	 * `"MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"`
	 * 						 
	 */
	secUid?: string
	

	/**
	 * The starting point of the items list. 
	 */
	cursor?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get recommended posts 
	 */
	explore: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `30`
	 * 						 
	 */
	count?: number
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;

	/**
	 * Posts Endpoints Category 
	 */
	posts: APIUserPosts


	/**
	 * Get user conversations 
	 */
	conversations: (params: {
	/**
	 * The starting point of the items list. 
	 */
	cursor?: string
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;


	/**
	 * Get user messages 
	 */
	messages: (params: {
	/**
	 *  
	 */
	conversationId?: any
	

	/**
	 *  
	 */
	conversationShortId?: any
	

	/**
	 * The starting point of the items list. 
	 */
	cursor?: string
	

	/**
	 *  
	 */
	limit?: any
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;

	/**
	 * Live Endpoints Category 
	 */
	live: APIUserLive


	/**
	 * Search for users 
	 */
	search: (params: {
	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"lilyachty"`
	 * 						 
	 */
	query?: any
	

	/**
	 * 	
	 * 
	 * @example
	 * 
	 * `"us"`
	 * 						 
	 */
	country?: string
	
} | FormData) => Promise<ResponseObject>;

	/**
	 * Analytics Endpoints Category 
	 */
	analytics: APIUserAnalytics

}

export interface API extends updateOptions<API> {
	/**
	 * Public Endpoints Category 
	 */
	public: APIPublic

	/**
	 * User Endpoints Category 
	 */
	user: APIUser

}

declare const API: API;

export default API;
	