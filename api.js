/**
 * The Types are automatically generated with Rests
 */
import Rests from "rests";
import { 
	jsCodeSample, 
	pyCodeSample,
	iterationCodeSamples,
	hashtagCodeSamples,
	exploreCodeSamples
} from "./code_samples.js";


/**
 * Frequently Used Parameters Schemas
 */
const p = {
	username: {
		help: "The TikTok user username",
		validate: "^([a-zA-Z0-9_\.]+|https?:\/\/vm.tiktok.com\/[a-zA-Z0-9]+\/?)$",
		type: "string"
	},
	secUid: {
		validate: "^(.*?){30,}$",
		help: "The TikTok user secUid. You can get this from the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint using the username.",
		type: "string",
		example: "MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"
	},
	user_id:{
		help: "The TikTok user ID",
		type: "string",
		validate: "^[0-9]+$",
	},
	cursor: {
		help: "The starting point of the items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)*",
		type: "string",
		validate: "^[0-9]+$"
	},
	offset: {
		help: "The starting offset of items list. Returned in every response, should be included in the next request for iteration.<br><br> *(A simple iteration method is already implemented in the Javascript & Python libraries as seen in the request samples)*",
		type: "number",
		validate: "^[0-9]+$"
	},
	count: {
		example: 30,
		default: 30,
		max: 30,
		type: "number",
		help: "Maximum amount of items for one request",
		validate: "^[0-9]{1,2}$"
	},
	musicId:{
		validate: "^([0-9]+|https?:\/\/vm.tiktok.com\/[a-zA-Z0-9]+\/?)$",
		type: "string",
		help: "The music ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)"
	},
	hashtagId:{
		validate: "^([0-9]+|https?:\/\/vm.tiktok.com\/[a-zA-Z0-9]+\/?)$",
		type: "string",
		help: "The hashtag ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)"
	},
	videoId:{
		help: "The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)",
		type: "string",
		validate: "^([0-9]+|https?:\/\/vm.tiktok.com\/[a-zA-Z0-9]+\/?)$"
	},
	commentId:{
		validate: "^[0-9]+$",
		help: "The comment ID",
		type: "string",
	},
	roomId:{
		help: "The Live room ID. You can find this using the <a href='#tag/Public/operation/public.check'>Get profile information</a> endpoint.",
		type: "string",
		example: "7112492061034646278"
	},
	nextCursor: {
		type: "string",
		help: "A iteration parameter returned in each response, should be included in the next requests to get the next items."
	}
};

const exampleSecUid = 'MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud';
const exampleUid = '6569595380449902597';
const exampleVideoId = '7109178205151464746';
const exampleVideoIdMoreParameters = '7003402629929913605';
const exampleCommentId = '7109185042560680750';

const premiumBadge = `**Premium**<img title='Only Business and Enterprise subscriptions can access this
endpoint' style='margin-bottom: -3px;cursor: help;'
src='/assets/img/star.png' width='18px'><br/>
`;

const specialBadge = `*This endpoint is only available to trusted customers. 
<a target="_blank" href='https://helpdesk.tikapi.io/portal/en/kb/articles/how-can-i-get-access-to-special-endpoints'> Learn more about special endpoints</a>*

`;

const videoLink = `<a target="_blank" href='https://helpdesk.tikapi.io/portal/en/kb/articles/how-to-download-tiktok-videos'>
Learn more about downloading videos</a>

`;


const userSecurity = (scopes=[])=>([{
		"apiKey": [],
		"accountKey": scopes
}]);


/**
 *  API Schema
 */
const API = Rests({
	$options:{
		base: "https://api.tikapi.io",
		sandboxBase: "http://sandbox.tikapi.io",
		params:{
			apiKey: {
				name: "X-API-KEY",
				required: true,
				location: "headers",
				validate: "^[a-zA-Z0-9]{10,}$",
				example: "DemoAPIKeyTokenSeHYGXDfd4SFD320Sc39Asd0Sc39Asd4s",
				help: "The TikAPI API Key is required for all requests",
				$initsOnly: true
			},	
		},
		$other: {
			openapi:{
				packageName: 'tikapi',
				jsTemplate: jsCodeSample,
				pyTemplate: pyCodeSample,
				fields:{
					security: [
						{
						  "apiKey": [],
						}
					],
					responses:{
						"403": {
							"$ref": "./error_responses/403.yaml"
						},
					}
				}
			}
		}
	},
	public: {
		help: "Public endpoints do not require an authenticated user.",
		$options: {
			params:{
				country: {
					type: "string",
					validate: "^[a-z]{2}$",
					help: `You can optionally choose the proxy country from where the request
					is being sent by providing an ISO Code (e.g us, ca, gb) — 200+ countries supported`,
					location: "query",
					example: "us"
				},
				session_id:{
					type: "number",
					max: 100,
					example: 0,
					help: "(Optional) Longer sessions. The cookies and IP are preserved through different requests for a longer amount of time. You should include this in order to get different posts on every request."
				}
			},
			$other:{
				openapi: {
					fields:{
						tags: [
							"Public"
						]
					},
				}
			}
		},
		check: {
			path: "/public/check",
			help: "Get a user's profile information",
			comment: "Get profile information and statistics from a username.",
			params: {
				username: {
					...p.username,
					example: 'lilyachty',
				},
				user_id: {
					...p.user_id,
					help: "Optionally you can get the profile information using the user_id parameter."
				}
			},
			$other:{
				openapi:{
					hideParams: ['user_id', 'session_id'],
					showExamplesInCode: ['username']
				}
			}
		},
		posts: {
			help: "Get a user's feed posts",
			path: "/public/posts",
			comment: videoLink,
			params: {
				secUid: {
					...p.secUid,
					required: true,
					example: exampleSecUid
				},
				count: p.count,
				cursor: p.cursor,
				user_id: p.user_id
			},
			$other:{
				openapi: {
					...iterationCodeSamples('cursor'),
					hideParams: ['session_id', 'user_id']
				}
			}
		},
		likes: {
			help: "Get a user's liked posts",
			path: "/public/likes",
			comment: videoLink,
			params: {
				secUid: {
					...p.secUid,
					required: true,
					example: exampleSecUid
				},
				count: p.count,
				cursor: p.cursor
			},
			$other:{
				openapi: {
					...iterationCodeSamples('cursor'),
					hideParams: ['session_id']
				}
			}
		},
		followersList:{
			help: "Get a user's followers list",
			comment: "Get followers list of any public profile.",
			path: "/public/followers",
			params: {
				secUid: {
					...p.secUid,
					required: true,
					example: exampleSecUid
				},
				count: p.count,
				nextCursor: p.nextCursor
			},
			$other:{
				openapi: {
					...iterationCodeSamples('nextCursor'),
					hideParams: ['session_id']
				}
			}
		},
		followingList:{
			help: "Get a user's following list",
			comment: "Get following list of any public profile.",
			path: "/public/following",
			params: {
				secUid: {
					...p.secUid,
					required: true,
					example: exampleSecUid
				},
				count: p.count,
				nextCursor: p.nextCursor
			},
			$other:{
				openapi: {
					...iterationCodeSamples('nextCursor'),
					hideParams: ['session_id']
				}
			}
		},
		explore: {
			help: "Get trending posts",
			comment: "Get a list of recommended posts from the *For You* section. <br/>" + videoLink,
			path: "/public/explore",
			params: {
				count: p.count,
				
			},
			$other:{
				openapi: {
					...exploreCodeSamples(),
					hideParams: ['session_id']
				}
			}
		},
		video: {
			path: "/public/video",
			help: "Get video information",
			comment: videoLink,
			params: {
				id: {
					...p.videoId,
					required: true,
					example: exampleVideoIdMoreParameters
				}
			},
			$other:{
				openapi: {
					hideParams: ['session_id']
				}
			}
		},
		videoV2: {
			path: "/public/video/v2",
			help: "Get video information (alternative endpoint)",
			comment: videoLink,
			params: {
				id: {
					...p.videoId,
					required: true,
					example: exampleVideoId
				}
			},
			$other:{
				openapi: {
					hide: true,
					hideParams: ['session_id']
				}
			}
		},
		videoV3: {
			path: "/public/video/v3",
			help: "Get video information (alternative endpoint)",
			comment: videoLink,
			params: {
				id: {
					...p.videoId,
					required: true,
					example: exampleVideoId
				},
				username: {
					...p.username,
					required: true,
					help: "The username of the video author."
				}
			},
			$other:{
				openapi: {
					hide: true,
					hideParams: ['session_id']
				}
			}
		},
		relatedPosts: {
			path: "/public/related_posts",
			help: "Get related posts",
			comment: videoLink,
			params: {
				video_id: {
					...p.videoId,
					help: "The video ID from which to get related posts. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)",
					required: true,
					example: exampleVideoId
				}
			},
			$other:{
				openapi: {
					hideParams: ['session_id'],
					fields: {
						'x-new': true
					}
				}
			}
		},
		playlists: {
			path: "/public/playlists",
			help: "Get a user's playlists",
			params: {
				secUid: {
					...p.secUid,
					required: true,
					example: exampleSecUid
				},
				count: p.count,
				cursor: p.cursor,
			},
			$other:{
				openapi: {
					...iterationCodeSamples('cursor'),
					hideParams: ['session_id'],
					fields: {
						'x-new': true
					}
				}
			}
		},
		playlistItems: {
			path: "/public/playlist/items",
			help: "Get a playlist items",
			params: {
				playlist_id: {
					validate: "^[0-9]+$",
					required: true,
					example: "6948562344666532614",
					help: "The playlist ID."
				},
				count: p.count,
				cursor: p.cursor,
			},
			$other:{
				openapi: {
					...iterationCodeSamples('cursor'),
					hideParams: ['session_id'],
					fields: {
						'x-new': true
					}
				}
			}
		},
		exploreCategory: {
			path: "/public/explore/category",
			help: "Get explore posts by category",
			comment: `The following categories are supported:<br/><br/>
			"Comedy & Drama": 1,<br/>
			"Dance & Music": 2,<br/>
			"Relationships": 3,<br/>
			"Nature & Pets": 4,<br/>
			"Lifestyle": 5,<br/>
			"Society": 6,<br/>
			"Fashion": 7,<br/>
			"Entertainment": 8,<br/>
			"Informative": 10,<br/>
			"Sports & Outdoors": 11,<br/>
			"Auto & Vehicle": 12,`,
			params: {
				category_id: {
					validate: "^[0-9]+$",
					required: true,
					example: "1",
					help: "The category ID."
				},
				count: p.count,
			},
			$other:{
				openapi: {
					...iterationCodeSamples('cursor'),
					hide: true,
					fields: {
						'x-new': true,
						'x-beta': true,
					}
				}
			}
		},
		hashtag: {
			help: "Get hashtag posts",
			comment: "Your first request should be using the hashtag `name` parameter, then the following requests should be using the `id` parameter which you have stored from the first request (returned in response `challengeInfo > challenge > id`). <br/>" + videoLink,
			path: "/public/hashtag",
			params: {
				id: {
					...p.hashtagId,
					example: '4655293',
				},
				name: {
					type: "string",
					help: "The hashtag name",
				},
				count: p.count,
				cursor: p.cursor,
			},
			$other:{
				openapi: {
					...hashtagCodeSamples('cursor'),
					hideParams: ['session_id']
				}
			}
		},
		commentsList: {
			help: "Get a video comments list",
			path: "/public/comment/list",
			params: {
				media_id: {
					...p.videoId,
					required: true,
					example: exampleVideoId
				},
				count: p.count,
				cursor: {
					...p.cursor,
					type: "number"
				},
			},
			$other:{
				openapi:{
					...iterationCodeSamples('cursor')
				}
			}
		},
		commentRepliesList: {
			help: "Get a comment replies list",
			path: "/public/comment/reply/list",
			params: {
				media_id: {
					...p.videoId,
					required: true,
					example: exampleVideoId
				},
				comment_id: {
					...p.commentId,
					required: true,
					example: exampleCommentId
				},
				count: p.count,
				cursor: {
					...p.cursor,
					type: "number"
				}
			},
			$other:{
				openapi:{
					...iterationCodeSamples('cursor')
				}
			}
		},
		music: {
			help: "Get music posts",
			comment: "Get a list of posts that are using this music. <br/>" + videoLink,
			path: "/public/music",
			params: {
				id: {
					...p.musicId,
					required: true,
					example: "28459463"
				},
				count: p.count,
				cursor: p.cursor,
			},
			$other:{
				openapi: {
					...iterationCodeSamples('cursor'),
					hideParams: ['session_id']
				}
			}
		},
		musicInfo: {
			help: "Get music information",
			path: "/public/music/info",
			params: {
				id: {
					...p.musicId,
					required: true,
					example: "28459463"
				}
			},
			$other:{
				openapi: {
					hideParams: ['session_id']
				}
			}
		},

		
		discover: {
			help: "Discover users, music, hashtags",
			comment: `Get popular users, music or hashtag. You can also include *Account Key* to show personalized results for the user.`,
			path: "/public/discover/{category}",
			params: {
				category: {
					help: "The discover category",
					example: "users",
					in: ["users", "music", "hashtag"],
					location: "path",
					type: "string",
					required: true
				},
				count: p.count,
				offset: p.offset,
			},
			$other:{
				openapi:{
					...iterationCodeSamples('offset'),
					hideParams: ['session_id']
				}
			}
		},
		discoverKeyword:{
			help: "Discover by keyword",
			comment: "Get popular posts, users, music or hashtags from a keyword. <br><br>Limited to only a few items. If you want more, try using the <a href='#tag/Public/operation/public.search'>Search</a> endpoint instead.",
			path: "/public/discover/keyword",
			params:{
				keyword: {
					required: true,
					example: "lilyachty",
					type: "string"
				},
			},
			$other:{
				openapi:{
					hideParams: ['session_id']
				}
			}
		},
		search:{
			help: "Search",
			comment: "Search anything, users, videos, or get keyword autocomplete suggestions. <br/>" + videoLink,
			path: '/public/search/{category}',
			params: {
				category: {
					help: "The search category",
					in: ["general", "users", "videos", "autocomplete"],
					required: true,
					type: "string",
					example: "general",
					location: "path"
				},
				query:{
					type: 'string',
					example: "lilyachty",
					required: true,
					help: 'The search keyword'
				},
				nextCursor: p.nextCursor,
				session_id:{
					type: "number",
					max: 100,
					example: 0,
					help: "The cookies and IP are preserved through different requests for a longer amount of time. You should use this if you want to keep the search suggestions the same."
				}
			},
			$other:{
				openapi:{
					...iterationCodeSamples('nextCursor'),
					hideParams: ['session_id']
				}
			}
		}
	},

	user: {
		help: 'The user endpoints require an `accountKey`',
		$options: {
			params: {
				accountKey: {
					name: "X-ACCOUNT-KEY",
					required: true,
					help: "The Account Key is required",
					location: "headers",
					validate: "^[a-zA-Z0-9]{10,}$",
					example: 'DemoAccountKeyTokenSeHYGXDfd4SFD320Sc39Asd0Sc39A',
					$initsOnly: true
				}	
			}
		},
		info: {
			help: "Get profile information",
			comment: "Get current user profile information, or another user's by specifying the username.",
			path: "/user/info",
			params: {
				username: p.username
			},
			$other:{
				openapi: {
					fields:{
						security: userSecurity(['view_profile']),
						tags: [
							"Profile"
						],
						
					},
				}
			}
		},
		edit: {
			help: "Edit profile",
			comment: premiumBadge + "Update the current user profile fields.",
			path: "/user/edit/{field}",
			method: "POST",
			params: {
				field:{
					required: true,
					help: "The profile field.",
					in: ["nickname", "username", "bio", "private"],
					example: "bio",
					location: "path",
					type: "string"
				},
				value:{
					required: true,
					type: "string",
					example: "My new bio",
					help: "The new field value"
				}
			},
			$other:{
				openapi: {
					fields:{
						security: userSecurity(['edit']),
						tags: [
							"Profile"
						],
						
					},
				}
			}
		},
		notifications: {
			help: "Get notifications",
			comment: "Get current user recent notifications.<br><br>*Note: Some notifications are limited by TikTok.*",
			path: "/user/notifications",
			params: {
				filter: {
					default: "all",
					help: "Filter notifications by type",
					type: "string",
					in: [
						"all", 
						"likes", 
						"comments", 
						"mentions", 
						"followers"
					],
				},
				count: p.count,
				max_time: {
					name: 'max_time',
					help: "Returned in every response, should be included in the next request for iteration.",
					validate: "^[0-9]+$"
				},
				min_time: {
					help: "Returned in every response, should be included in the next request for iteration.",
					name: 'min_time',
					validate: "^[0-9]+$"
				}
			},
			$other:{
				openapi: {
					...iterationCodeSamples('min_time'),
					fields:{
						security: userSecurity(['view_notifications']),
						tags: [
							"Profile"
						],
						
					},
				}
			}
		},
		analytics: {
			help: "Get analytics",
			comment: "Get analytics for business or creator accounts",
			path: "/creator/analytics/{type}",
			params:{
				type:{
					required: true,
					in: ['overview', 'content', 'video', 'followers', 'live'],
					type: "string",
					help: "The analytics type",
					example: "overview",
					location: "path"
				},
				days:{
					default: 7,
					help: "The days time frame for the analytics data",
					validate: "^[0-9]+$",
					type: "number"
				},
				media_id: {
					help: "Required only for **video** type analytics, otherwise don't include.",
					validate: "^[0-9]+$"
				}
			},
			$other:{
				openapi: {
					fields:{
						security: userSecurity(['view_analytics']),
						tags: [
							"Profile"
						],

					},
				}
			}
		},
		verify:{
			help: "Check session",
			comment: "Check if the current user's session is valid. Auto-removes the user if it's invalid. <br><br>*Note: The session is automatically checked, though you can still manually call this endpoint if you are having issues with a user.*",
			path: "/user/session/check",
			$other:{
				openapi: {
					fields:{
						security: userSecurity(['view_profile']),
						tags: [
							"Profile"
						],
						responses:{
							"428": {
								"$ref": "./error_responses/428.yaml"
							},
						}
					},
				}
			}
		},
		followingV1: {
			help: "Get following list",
			comment: "Get current user's following list",
			path: "/user/following/v1",
			params: {
				count: p.count,
				cursor: {
					...p.cursor,
					type: "number"
				}
			},
			$other:{
				openapi: {
					hide: true,
					fields:{
						tags: [
							"Followers"
						],
						security: userSecurity(['view_followers']),
					},
				}
			}
		},
		following:{
			help: "Get following list",
			comment: "Get current user following list (or a friends by specifying the secUid).",
			path: "/user/following",
			params: {
				secUid: {
					...p.secUid,
					example: exampleSecUid
				},
				count: p.count,
				nextCursor: p.nextCursor
			},
			$other:{
				openapi: {
					...iterationCodeSamples('nextCursor'),
					fields:{
						tags: [
							"Followers"
						],
						security: userSecurity(['view_followers']),
					},
				}
			}
		},
		followers:{
			help: "Get followers list",
			comment: "Get current user followers list (or a friends by specifying the secUid).",
			path: "/user/followers",
			params: {
				secUid: {
					...p.secUid,
					example: exampleSecUid
				},
				count: p.count,
				nextCursor: p.nextCursor
			},
			$other:{
				openapi: {
					...iterationCodeSamples('nextCursor'),
					fields:{
						tags: [
							"Followers"
						],
						security: userSecurity(['view_followers']),
					},
				}
			}
		},
		follow: {
			help: "Follow a user",
			comment: specialBadge + `<br>This endpoint is deprecated and might not work as excpeted.`,
			path: "/user/follow",
			method: "POST",
			enctype: "json",
			params: {
				username: {
					...p.username,
					required: true,
					example: 'lilyachty',
				},
				secUid:{
					...p.secUid,
					required: true
				},
				user_id: {
					...p.user_id,
					required: true,
					example: '6569595380449902597'
				}
			},
			$other:{
				openapi: {
					hide: true,
					fields:{
						deprecated: true,
						tags: [
							"Followers"
						],
						security: userSecurity(['follow_actions']),
					},
				}
			}
		},
		unfollow: {
			help: "Unfollow a user",
			comment: specialBadge + `<br>This endpoint is deprecated and might not work as excpeted.`,
			path: "/user/unfollow",
			method: "POST",
			enctype: "json",
			params: {
				username: {
					...p.username,
					required: true,
					example: 'lilyachty'
				},
				secUid:{
					...p.secUid,
					required: true
				},
				user_id: {
					...p.user_id,
					required: true,
					example: '6569595380449902597'
				}
			},
			$other:{
				openapi: {
					hide: true,
					fields:{
						deprecated: true,
						tags: [
							"Followers"
						],
						security: userSecurity(['follow_actions']),
					},
				}
			}
		},
		posts: {
			$options:{
				$other:{
					openapi: {
						fields:{
							tags: [
								"Posts"
							],
						},
					}
				}
			},
			feed: {
				help: "Get feed posts",
				comment: "Get current user feed posts, or someone elses by providing the `secUid` parameter.",
				path: "/user/feed",
				params: {
					count: p.count,
					cursor: p.cursor,
					secUid: p.secUid,
					user_id: p.user_id
				},
				$other:{
					openapi: {
						...iterationCodeSamples('cursor'),
						fields:{
							security: userSecurity(['explore']),
						},
						hideParams: ['user_id']
					}
				}
			},
			likes: {
				help: "Get liked posts",
				comment: "Get current user liked posts, or someone elses by providing the `secUid` parameter.",
				path: "/user/likes",
				params: {
					count: p.count,
					secUid: p.secUid,
					cursor: p.cursor,
				},
				$other:{
					openapi: {
						...iterationCodeSamples('cursor'),
						fields:{
							security: userSecurity(['explore'])
						}
					}
				}
			},
			followingPosts: {
				path: "/user/following_posts",
				help: "Get following posts",
				comment: videoLink,
				params: {
					count: p.count,
					cursor: p.cursor,
				},
				$other:{
					openapi: {
						fields: {
							'x-new': true,
							security: userSecurity(['explore'])
						}
					}
				}
			},
			relatedPosts: {
				path: "/user/related_posts",
				help: "Get related posts",
				comment: videoLink,
				params: {
					video_id: {
						...p.videoId,
						help: "The video ID from which to get related posts. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU)",
						required: true,
						example: exampleVideoId
					}
				},
				$other:{
					openapi: {
						fields: {
							'x-new': true,
							security: userSecurity(['explore'])
						}
					}
				}
			},
			savedPosts: {
				path: "/user/saved",
				help: "Get saved posts",
				comment: videoLink,
				params: {
					count: p.count,
					cursor: p.cursor,
				},
				$other:{
					openapi: {
						fields: {
							'x-new': true,
							security: userSecurity(['view_collections'])
						}
					}
				}
			},
			playlists: {
				path: "/user/playlists",
				help: "Get user playlists",
				params: {
					secUid: {
						...p.secUid,
						required: false,
						example: exampleSecUid
					},
					count: p.count,
					cursor: p.cursor,
				},
				$other:{
					openapi: {
						...iterationCodeSamples('cursor'),
						fields: {
							'x-new': true,
							security: userSecurity(['view_collections'])
						}
					}
				}
			},
			playlistItems: {
				path: "/user/playlist/items",
				help: "Get a playlist items",
				params: {
					playlist_id: {
						validate: "^[0-9]+$",
						required: true,
						example: "6948562344666532614",
						help: "The playlist ID."
					},
					count: p.count,
					cursor: p.cursor,
				},
				$other:{
					openapi: {
						...iterationCodeSamples('cursor'),
						fields: {
							'x-new': true,
							security: userSecurity(['view_collections'])
						}
					}
				}
			},
			explore: {
				help: "Get trending posts",
				comment: "Get current user recommended posts from the *For You* section.",
				path: "/user/explore",
				params: {
					count: p.count
				},
				$other:{
					openapi: {
						fields:{
							security: userSecurity(['explore']),
						},
					}
				}
			},
			search:{
				help: "Search",
				comment: "Search anything, users, videos, or get keyword autocomplete suggestions. Using this instead of the Public Search endpoint will give you more personalized and consistent results. <br/>" + videoLink,
				path: '/user/search/{category}',
				params: {
					category: {
						help: "The search category",
						in: ["general", "users", "videos", "autocomplete"],
						required: true,
						type: "string",
						example: "general",
						location: "path"
					},
					query:{
						type: 'string',
						example: "lilyachty",
						required: true,
						help: 'The search keyword'
					},
					nextCursor: p.nextCursor,
				},
				$other:{
					openapi:{
						...iterationCodeSamples('nextCursor'),
						fields:{
							security: userSecurity(['explore']),
						},
					}
				}
			},
			video: {
				help: "Get video information",
				comment: videoLink,
				path: "/user/video",
				params: {
					id: {
						...p.videoId,
						required: true,
						example: exampleVideoIdMoreParameters
					}
				},
				$other:{
					openapi: {
						fields:{
							security: userSecurity(['explore']),
						},
					}
				}
			},
			like: {
				help: "Like a video",
				comment: specialBadge,
				path: "/user/like",
				method: "POST",
				enctype: "json",
				params: {
					media_id: {
						...p.videoId,
						required: true,
						example: exampleVideoId
					}
				},
				$other:{
					openapi: {
						fields:{
							security: userSecurity(['media_actions']),
						},
					}
				}
			},
			unlike: {
				help: "Unlike a video",
				comment: specialBadge,
				path: "/user/unlike",
				method: "POST",
				enctype: "json",
				params: {
					media_id: {
						...p.videoId,
						required: true,
						example: exampleVideoId
					}
				},
				$other:{
					openapi: {
						fields:{
							security: userSecurity(['media_actions']),
						},
					}
				}
			},
			comments: {
				$options:{
					$other:{
						openapi: {
							fields:{
								security: userSecurity(['media_actions']),
							},
						}
					}
				},
				list: {
					help: "Get a video comments list",
					path: "/user/comment/list",
					params: {
						media_id: {
							...p.videoId,
							required: true,
							example: exampleVideoId
						},
						count: p.count,
						cursor: {
							...p.cursor,
							type: "number"
						},
					},
					$other:{
						openapi:{
							...iterationCodeSamples('cursor')
						}
					}
				},
				replies: {
					help: "Get a comment reply list",
					path: "/user/comment/reply/list",
					params: {
						media_id: {
							...p.videoId,
							required: true,
							example: exampleVideoId
						},
						comment_id: {
							...p.commentId,
							required: true,
							example: exampleCommentId
						},
						count: p.count,
						cursor: {
							...p.cursor,
							type: "number"
						}
					},
					$other:{
						openapi:{
							...iterationCodeSamples('cursor')
						}
					}
				},
				post: {
					path: "/user/comment",
					method: "POST",
					enctype: "json",
					help: "Post a new comment",
					comment: specialBadge + "Make a comment or reply to a comment.",
					params: {
						media_id: {
							...p.videoId,
							required: true,
							example: exampleVideoId
						},
						text: {
							required: true,
							type: "string",
							help: "The comment text",
							example: "Italian food is the best"
						},
						reply_comment_id: {
							validate: "^[0-9]+$",
							type: "string",
							help: "You can reply to a comment by including a comment ID"
						},
						has_tags: {
							type: "boolean",
							default: false,
							help: "You should set this to true if you are mentioning someone."
						},
					}
				},
				like: {
					help: "Like a comment",
					path: "/user/comment/like",
					method: "POST",
					enctype: "json",
					params: {
						media_id: {
							...p.videoId,
							required: true,
							example: exampleVideoId
						},
						comment_id: {
							...p.commentId,
							required: true,
							example: exampleCommentId
						},
					}
				},
				unlike: {
					help: "Unlike a comment",
					path: "/user/comment/unlike",
					method: "POST",
					enctype: "json",
					params: {
						media_id: {
							...p.videoId,
							required: true,
							example: exampleVideoId
						},
						comment_id: {
							...p.commentId,
							required: true,
							example: exampleCommentId
						}
					}
				},
				delete:{
					path: "/user/comment/delete",
					help: "Delete a comment",
					comment: specialBadge,
					method: "POST",
					params:{
						comment_id: {
							...p.commentId,
							required: true,
							example: exampleCommentId
						},
					}
				}
			}
		},
		conversations: {
			path: '/user/conversations',
			help: "Get user conversations",
			comment: premiumBadge + "Get a list of current user conversations including the latest messages",
			params: {
				nextCursor: p.offset
			},
			$other:{
				openapi: {
					...iterationCodeSamples('nextCursor'),
					fields:{
						tags: [
							"Messages"
						],
						security: userSecurity(['view_messages']),
					},
				}
			}
		},
		messages: {
			path: '/user/messages',
			help: "Get user messages",
			comment: premiumBadge + "Get full messages list of a conversation",
			params: {
				conversation_id: {
					help: "The conversation ID",
					required: true,
					example: "0:1:684574219823284956:69402435203845897564"
				},
				conversation_short_id: {
					help: "The additional conversation short ID (TikTok uses two different ID's for some reason)",
					required: true,
					example: "6940245147502654884"
				},
				nextCursor: p.cursor,
				limit: {
					validate: "^[0-9]{1,2}$"
				}
			},
			$other:{
				openapi: {
					...iterationCodeSamples('nextCursor'),
					fields:{
						tags: [
							"Messages"
						],
						security: userSecurity(['view_messages']),
					},
				}
			}
		},
		sendMessage:{
			path: '/user/message/send',
			help: 'Send a message',
			comment: premiumBadge + specialBadge,
			method: "POST",
			params: {
				text:{
					required: true,
					type: "string",
					help: "The message text",
					example: "Hey! How you doing?"
				},
				conversation_id: {
					help: "The conversation ID",
					required: true,
					type: "string",
					example: "0:1:684574219823284956:69402435203845897564"
				},
				conversation_short_id: {
					help: "The additional conversation short ID (TikTok uses two different ID's for some reason)",
					required: true,
					type: "string",
					example: "6940245147502654884"
				},
				ticket:{
					help: "The conversation ticket",
					required: true,
					type: "string",
					example: "3M8IlBpABq00h2aNB1B5JJ2ne0DTnGLLAFjGQQGMf4BKWJxEYxf7RAE0KaD2EjkQkWiJalT4xj36JGWa1ZmQg7SgQfHLoXffNFYLkIJhe1HVyiPXitoxWFyuzlX1xvBCYhZxkQALHE4gx9AaXBPEZjks7jC"
				}
			},
			$other:{
				openapi: {
					fields:{
						tags: [
							"Messages"
						],
						security: userSecurity(['send_messages']),
					},
				}
			}
		},

		conversationRequests: {
			$options:{
				$other:{
					openapi: {
						fields:{
							tags: [
								"Messages"
							],
							security: userSecurity(['conversation_requests']),
							'x-new': true,
						},
					}
				}
			},
			conversations: {
				path: '/user/conversations/requests',
				help: "Get user conversation requests",
				comment: premiumBadge + "Get a list of current user conversations requests including the latest message.",
				params: {
					nextCursor: p.offset
				},
				$other:{
					openapi: {
						...iterationCodeSamples('nextCursor'),
					}
				}
			},
			messages: {
				path: '/user/messages/requests',
				help: "Get a conversation request messages",
				comment: premiumBadge + "Get the messages of a conversation in the requests tab (generally there is a 3 message limit).",
				params: {
					conversation_id: {
						help: "The conversation ID",
						required: true,
						example: "0:1:684574219823284956:69402435203845897564"
					},
					conversation_short_id: {
						help: "The additional conversation short ID",
						required: true,
						example: "6940245147502654884"
					}
				}
			},
			markRead: {
				path: '/user/conversations/requests/mark_read',
				help: "Mark a requests conversation as read",
				comment: premiumBadge,
				params: {
					conversation_id: {
						help: "The conversation ID",
						required: true,
						example: "0:1:684574219823284956:69402435203845897564"
					},
					conversation_short_id: {
						help: "The additional conversation short ID",
						required: true,
						example: "6940245147502654884"
					}
				},
				$other:{
					openapi: {
						hide: true
					}
				}
			},
			delete: {
				path: '/user/conversations/requests/delete',
				help: "Delete a conversation request",
				comment: premiumBadge,
				params: {
					conversation_id: {
						help: "The conversation ID",
						required: true,
						example: "0:1:684574219823284956:69402435203845897564"
					},
					conversation_short_id: {
						help: "The additional conversation short ID",
						required: true,
						example: "6940245147502654884"
					}
				}
			},
			accept: {
				path: '/user/conversations/requests/accept',
				help: "Accept a conversation request",
				comment: premiumBadge,
				params: {
					conversation_id: {
						help: "The conversation ID",
						required: true,
						example: "0:1:684574219823284956:69402435203845897564"
					},
					conversation_short_id: {
						help: "The additional conversation short ID",
						required: true,
						example: "6940245147502654884"
					},
					user_id: {
						...p.user_id,
						help: "The sender ID.",
						required: true,
						example: "6569595380449902597"
					}
				}
			},
		},
		live: {
			$options:{
				$other:{
					openapi: {
						fields:{
							tags: [
								"Live"
							],
							security: userSecurity(['live']),
						},
					}
				}
			},
			permissions:{
				help: "Check live permissions",
				comment: "Check current user live permissions. You can use this to check if the user has third_party streaming enabled.",
				path: "/user/live/info"
			},
			start: {
				help: 'Start live video',
				path: '/user/live/start',
				method: 'POST',
				enctype: 'json',
				comment: premiumBadge + `Start a live video, if the user has live enabled.
				The live is closed automatically after stream ends.`,
				params: {
					title: {
						required: true,
						example: "Check out my live!",
						help: "The live room header title"
					},
					third_party: {
						default: true,
						help: "TikTok has a special gateway for invite only users. Only if this is enabled you can do third party streaming."
					},
					hashtag_id:{
						help: "(Optional) The topic ID. You can find this by using the <a href='#tag/Live/operation/user.live.topics'>Get topics list</a> endpoint.",
						type: "number"
					},
					game_tag_id:{
						help: "(Optional) The sub-topic ID for gaming topics.",
						type: "number"
					}
				}
			},
			stop: {
				help: 'Stop live video',
				comment: premiumBadge,
				path: '/user/live/stop',
				method: 'POST',
				enctype: 'json'
			},
			info: {
				help: 'Get live information',
				comment: `Get information about a live video. <br/>You can use this for any user
				that has an open live video. There is a \`roomId\` parameter included when
				fetching profile information about users.`,
				path: '/user/live/check',
				params: {
					room_id: {
						...p.roomId,
						required: true,
					},
				},
			},
			recommend: {
				help: 'Get recommended live videos',
				path: '/user/live/recommend',
				comment: "Get a list of recommended live videos, related with a live video.",
				params: {
					room_id: {
						...p.roomId,
						required: true,
					},
				},
			},
			stats: {
				help: 'Get live statistics',
				comment: "Get statistics for the current user live video, after it has ended.",
				path: '/user/live/stats',
				params: {
					room_id: {
						...p.roomId,
						required: true,
					},
				}
			},
			chat:{
				help: "Get live chat and gifts",
				comment: premiumBadge + "Get real-time live chat, gifts, and other events for any live video.",
				path: "/user/live/chat",
				params:{
					room_id: {
						...p.roomId,
						required: true,
					},
					nextCursor: {
						type: "string",
						help: "Returned in each response, should be included in the next requests to get the next chat events."
					}
				},
				$other:{
					openapi:{
						...iterationCodeSamples('nextCursor'),
						fields:{
							security: userSecurity(['live','send_messages']),
						},
					}
				}
			},
			sendChat: {
				help: "Send a message to a live chat",
				comment: premiumBadge + specialBadge + "Send a chat message to any live video",
				path: "/user/live/chat/send",
				method: "POST",
				params: {
					room_id: {
						...p.roomId,
						required: true,
					},
					text:{
						required: true,
						type: "string",
						help: "The chat text message",
						example: "A mí me gusta"
					}
				}
			},
			topics:{
				help: "Get live topics list",
				path: "/user/live/topics"
			},
			transactionHistory:{
				help: "Get coin transactions history",
				path: "/user/wallet/transactions",
				params:{
					page:{
						help: "The list page number",
						example: 1
					},
					count:{
						help: "The items limit per page",
						example: 12
					}
				},
				$other:{
					openapi:{
						fields:{
							security: userSecurity(['view_coins']),
						},
					}
				}
			},
			search:{
				help: "Search live videos",
				path: "/user/search/live",
				params:{
					query:{
						type: 'string',
						example: "lilyachty",
						required: true,
						help: 'The search keyword'
					},
					cursor: p.offset,
				},
				$other:{
					openapi:{
						fields:{
							...iterationCodeSamples('cursor'),
							'x-new': true
						},
					}
				}
			},
			analytics:{
				help: "Get live analytics",
				path: "/user/live/analytics",
				params:{
					days:{
						default: 7,
						help: "The days time frame for the analytics data",
						validate: "^[0-9]+$",
						type: "number"
					},
				},
				$other:{
					openapi:{
						fields:{
							'x-new': true,
							security: userSecurity(['view_analytics']),
						},
					}
				}
			},
			list:{
				help: "Get live videos list",
				path: "/user/live/list",
				params:{
					count: p.count,
					offset: p.offset,
					sort: {
						help: "Sort results by ascending (1) or descending (0). Default is descending (0).",
						in: [0, 1],
						default: 0,
						type: "number",
						example: 1
					}
				},
				$other:{
					openapi:{
						fields:{
							'x-new': true
						},
					}
				}
			},
			details:{
				help: "Get a live video details",
				path: "/user/live/detail",
				params:{
					room_id: {
						...p.roomId,
						help: "The Live room ID.",
						required: true
					}
				},
				$other:{
					openapi:{
						fields:{
							'x-new': true
						},
					}
				}
			},
		},		
	},
	key: {
		path: '/key/info',
		help: 'Get information about your API Key',
		$other: {
			openapi:{
				fields:{
					tags: [
						"Key"
					]
				}
			}
		}
	}
});

export default API;

