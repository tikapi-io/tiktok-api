import Rests from "rests";


/**
 * Frequently Used Parameters Schemas
 */
const p = {
	username: {
		help: "The TikTok account username",
		validate: "^([a-zA-Z0-9_\.]+|https?:\/\/vm.tiktok.com\/[a-zA-Z0-9]+\/?)$",
		type: "string"
	},
	secUid: {
		validate: "^(.*?){30,}$",
		help: "The TikTok user secUid.",
		type: "string",
		example: "MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"
	},
	user_id:{
		help: "The TikTok user ID",
		type: "string",
		validate: "^[0-9]$",
	},
	cursor: {
		help: "The starting point of the items list.",
		type: "string",
		validate: "^[0-9]+$"
	},
	offset: {
		help: "The starting offset of items list.",
		type: "number",
		validate: "^[0-9]+$"
	},
	count: {
		example: 30,
		default: 30,
		type: "number",
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
		help: "The video ID. Can also be a short TikTok link (e.g. vm.tiktok.com/UwU).",
		example: "6950501241915018501",
		type: "string",
		validate: "^([0-9]+|https?:\/\/vm.tiktok.com\/[a-zA-Z0-9]+\/?)$"
	},
	commentId:{
		validate: "^[0-9]+$",
		help: "The comment ID",
		type: "string",
		example: "6950502632121548805"
	}
};

/**
 *  API Schema
 */
const API = Rests({
	$options:{
		base: "https://api.tikapi.io",
		params:{
			apiKey: {
				name: "X-API-KEY",
				required: true,
				location: "headers",
				validate: "^[a-zA-Z0-9]{10,}$",
				example: "myApiKey",
				$tshide: true
			},	
		}
	},
	public: {
		$help: "Public endpoints do not require an authenticated user.",
		$options: {
			params:{
				country: {
					required: false,
					type: "string",
					example: "us",
					validate: "^[a-z]{,2}$",					
				}
			}
		},
		user: {
			path: "/public/check",
			help: "Get a user's profile information",
			params: {
				username: {
					...p.username,
					required: true,		
				},
				secUid: p.secUid
			}
		},
		explore: {
			help: "Get recommended posts (For You)",
			path: "/public/explore",
			params: {
				count: p.count,
			}
		},
		posts: {
			help: "Get a user's feed posts",
			path: "/public/posts",
			params: {
				secUid: {
					...p.secUid,
					required: true
				},
				count: p.count,
				cursor: p.cursor
			}
		},
		likes: {
			help: "Get a user's liked posts",
			path: "/public/likes",
			params: {
				secUid: {
					...p.secUid,
					required: true
				},
				count: p.count,
				cursor: p.cursor
			},
		},
		video: {
			path: "/public/video",
			help: "Get video information",
			params: {
				id: {
					...p.videoId,
					required: true,
				},
				username: p.username,
			}
		},
		discover: {
			$help: "Discover users, music, hashtags",
			$options: {
				params: {
					keyword: {
						help: "Discover keyword is optional",
						example: 'lilyachty',
						type: "string"
					},
					count: p.count,
					offset: p.offset,
				}
			},
			users: {
				path: "/public/discover/users",
			},
			music: {
				path: "/public/discover/music",
			},
			hashtag: {
				path: "/public/discover/hashtag",
			}
		},
		hashtag: {
			help: "Get posts by hashtag ID. Your first request should be using the `name` parameter, the following requests should be using the `id` parameter which you have stored from the first request.",
			path: "/public/hashtag",
			params: {
				id: p.hashtagId,
				name: {
					type: "string",
					help: "The hashtag name"
				},
				count: p.count,
				cursor: p.cursor,
			}
		},
		music: {
			help: "Get posts by music ID",
			path: "/public/music",
			params: {
				id: {
					...p.musicId,
					required: true,
				},
				count: p.count,
				cursor: p.cursor,
			}
		},
		musicInfo: {
			help: "Get music information",
			path: "/public/music/info",
			params: {
				id: {
					...p.musicId,
					required: true
				}
			}
		},
		search:{
			$options:{
				params: {
					query:{
						type: 'string',
						required: true,
						help: 'The search keyword'
					},
					offset: p.offset
				}
			},
			general:{
				path: '/public/search/general',
				help: "Search anything",
			},
			users:{
				path: '/public/search/users',
				help: "Search TikTok users",
			},
			videos:{
				path: '/public/search/videos',
				help: "Search videos",
			},
			words:{
				path: '/public/search/words',
				help: "Get keyword suggestions",
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
					help: "The Account Key is required.",
					location: "headers",
					validate: "^[a-zA-Z0-9]{10,}$",
					example: 'myAccountKey',
					$tshide: true
				}	
			}
		},
		info: {
			help: "Get current user profile information",
			path: "/user/info",
		},
		edit: {
			help: "Edit the user profile",
			path: "/user/edit",
			method: "POST",
			enctype: "json",
			params: {
				nickname: {
					example: false,
				},
				username: {
					example: false,
				},
				bio: {
					example: "My new bio",
				},
				privacy: {
					example: false,
					validate: "^[0-1]$"
				}
			}
		},
		notifications: {
			help: "Get user notifications",
			path: "/user/notifications",
			params: {
				filter: {
					default: "all",
					in: ["all", "likes", "comments", "mentions", "followers"],
				},
				count: p.count,
				max_time: {
					name: 'max_time',
					validate: "^[0-9]+$"
				},
				min_time: {
					name: 'min_time',
					validate: "^[0-9]+$"
				}
			}
		},
		following: {
			help: "Get following list",
			path: "/user/following",
			params: {
				count: p.count,
				cursor: {
					...p.cursor,
					type: "number"
				}
			}
		},
		follow: {
			help: "Follow an user",
			path: "/user/follow",
			method: "POST",
			enctype: "json",
			params: {
				username: {
					...p.username,
					required: true
				},
				user_id: {
					...p.user_id,
					required: true
				}
			}
		},

		unfollow: {
			help: "Unfollows an user",
			path: "/user/follow",
			method: "POST",
			enctype: "json",
			params: {
				username: {
					...p.username,
					required: true
				},
				user_id: {
					...p.user_id,
					required: true
				}
			}
		},
		
		feed: {
			help: "Get current user feed posts, or someone elses by providing the `secUid` parameter.",
			path: "/user/feed",
			params: {
				count: p.count,
				cursor: p.cursor,
				secUid: p.secUid
			}
		},

		likes: {
			help: "Get user liked posts",
			path: "/user/likes",
			params: {
				count: p.count,
				secUid: p.secUid,
				cursor: p.cursor,
			}
		},

		explore: {
			help: "Get recommended posts",
			path: "/user/explore",
			params: {
				count: p.count
			}
		},

		posts: {
			info: {
				help: "Get video information",
				path: "/user/video",
				params: {
					id: {
						...p.videoId,
						required: true
					}
				}
			},
			like: {
				help: "Like a video",
				path: "/user/like",
				method: "POST",
				enctype: "json",
				params: {
					media_id: {
						...p.videoId,
						required: true
					}
				}
			},
			unlike: {
				help: "Unlike a video",
				path: "/user/like",
				method: "POST",
				enctype: "json",
				params: {
					media_id: {
						...p.videoId,
						required: true
					}
				}
			},
			comments: {
				list: {
					help: "Get a video comments list",
					path: "/comment/list",
					params: {
						media_id: {
							...p.videoId,
							required: true
						},
						count: p.count,
						cursor: p.cursor,
					}
				},
				replies: {
					help: "Get a comment reply list",
					path: "/comment/reply/list",
					params: {
						media_id: {
							...p.videoId,
							required: true
						},
						comment_id: {
							...p.commentId,
							required: true
						},
						count: p.count
					}
				},
				post: {
					path: "/user/comment",
					method: "POST",
					enctype: "json",
					help: "Post a new comment",
					params: {
						media_id: {
							...p.videoId,
							required: true
						},
						text: {
							required: true,
							example: "That's cool"
						},
						reply_comment_id: {
							validate: "^[0-9]+$",
							help: "You can reply to a comment by including a comment ID"
						},
						has_tags: {
							type: "boolean"
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
							required: true
						},
						comment_id: {
							...p.commentId,
							required: true
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
							required: true
						},
						comment_id: {
							...p.commentId,
							required: true
						}
					}
				}
			}
		},
		conversations: {
			path: '/user/conversations',
			help: "Get user conversations",
			params: {
				cursor: p.cursor
			}
		},
		messages: {
			path: '/user/messages',
			help: "Get user messages",
			params: {
				conversationId: {
					required: true
				},
				conversationShortId: {
					required: true
				},
				cursor: p.cursor,
				limit: {
					validate: "^[0-9]{1,2}$"
				}
			}
		},

		live: {
			start: {
				help: 'Start a live video',
				path: '/user/live/start',
				method: 'POST',
				enctype: 'json',
				params: {
					title: {
						required: true,
						example: "Check out my live!"
					}
				}
			},
			stop: {
				help: 'Stop a live video',
				path: '/user/live/stop',
				method: 'POST',
				enctype: 'json'
			},
			info: {
				help: 'Get a live video information',
				path: '/user/live/check',
				params: {
					room_id: {
						required: true,
						type: "string"
					}
				},
			},
			recommend: {
				help: 'Get recommended live videos based on a live video',
				path: '/user/live/recommend',
				params: {
					room_id: {
						required: true,
						type: "string"
					}
				},
			},
			stats: {
				help: 'Get a ended live video statistics',
				path: '/user/live/stats',
				params: {
					room_id: {
						required: true,
						type: "string"
					}
				}
			},
			enter: {
				help: "Enter a live video and get information",
				path: '/user/live/enter',
				params: {
					room_id: {
						required: true,
						type: "string"
					}
				},
			}
		},
		
		search: {
			help: "Search for users",
			path: '/user/search',
			params: {
				query: {
					required: true,
					example: 'lilyachty'
				}
			}
		},

		analytics: {
			$help: "Get analytics for creator accounts",
			$options:{
				params:{
					days:{
						default: 7,
						validate: "^[0-9]+$"
					}
				}
			},
			overview: {
				path: "/creator/analytics/overview",
			},
			content: {
				path: "/creator/analytics/content",
			},
			followers: {
				path: "/creator/analytics/followers",
			},
			video: {
				path: "/creator/analytics/video",
				params: {
					media_id: {
						required: true,
						validate: "^[0-9]+$"
					}
				},
			},
			live: {
				path: "/creator/analytics/live",
			}
		}
	}
});

export default API;