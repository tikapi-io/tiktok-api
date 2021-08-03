const Wrape = require("wrape");

const endpoints = {
	public: {
		$help: "Public endpoints do not require an user authorization",
		user: {
			path: "/public/check",
			help: "Get user profile information",
			params: {
				username: {
					required: true,
					help: "The TikTok account username",
					example: "lilyachty"
				},
				secUid: {
					help: "The TikTok user secUid",
					validate: "^(.*?){30,}$"
				}
			},
			example_response: {
				"status": "success",
				"message": "string",
				"statusCode": 0,
				"userInfo": {
				  "user": {
					"id": 684574219000000000,
					"uniqueId": "lilyachty",
					"nickname": "lilyachty",
					"avatarThumb": "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tiktok-obj/db20c99f44182ab54cca90de85f673bf.jpeg?x-expires=1606165200&x-signature=pw%2BueamaONA9LQMd7h0Pyyb0%2FAY%3D",
					"avatarMedium": "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tiktok-obj/db20c99f44182ab54cca90de85f673bf.jpeg?x-expires=1606165200&x-signature=8FzlgFpqsP8ZPLJhxDKmqHyJ0N0%3D",
					"avatarLarger": "https://p16-sign-sg.tiktokcdn.com/aweme/1080x1080/tiktok-obj/db20c99f44182ab54cca90de85f673bf.jpeg?x-expires=1606165200&x-signature=SYNT1mnTj7VipZCFrh8FrmVsRJU%3D",
					"signature": null,
					"verified": true,
					"secUid": "MS4wLjABAAAA77...........",
					"secret": true,
					"ftc": true,
					"relation": 0,
					"openFavorite": true,
					"commentSetting": 0,
					"duetSetting": 0,
					"stitchSetting": 0,
					"privateAccount": true
				  },
				  "stats": {
					"followingCount": 0,
					"followerCount": 0,
					"heartCount": 0,
					"videoCount": 0,
					"diggCount": 0,
					"heart": 0
				  },
				  "shareMeta": {
					"title": "lilyachty on TikTok",
					"desc": "@lilyachty 0 Followers 0 Following 0 Likes - Watch awesome short videos created by lilyachty"
				  }
				}
			}
		},
		explore: {
			help: "Get recommended posts",
			path: "/public/explore",
			params: {
				count: {
					example: 5,
					default: 30,
					validate: "^[0-9]{1,2}$"
				},
				country: {
					required: false,
					validate: "^[a-z]{,2}$"
				}
			}
		},
		posts: {
			help: "Get posts of an user",
			path: "/public/posts",
			params: {
				secUid: {
					required: true,
					validate: "^(.*?){30,}$",
					help: "The user secUid",
					example: "MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"
				},
				count: {
					example: 5,
					default: 30,
					validate: "^[0-9]{1,2}$"
				},
				cursor: {
					validate: "^[0-9]+$"
				}
			},
			example_response: {
				"status": "success",
				"message": "string",
				"statusCode": 0,
				"itemList": [
				  {
					"id": 6932268218690145000,
					"desc": "The way he dives into the ball pit 😂😂😂 TYSM to Sarah and Rock Dodd from NY! 🥰",
					"createTime": 1614044487,
					"video": {
					  "id": 6932268218690145000,
					  "height": 1024,
					  "width": 576,
					  "duration": 58,
					  "ratio": "720p",
					  "cover": "https://p16-sign-sg.tiktokcdn.com/tos-maliva-p-0068/7a9f49ac001748bc8c807b74805696a0~tplv-dmt-logom:tos-maliva-p-0000/147eca0bbe4a4320adf3a754500753b6.image?x-expires=1614106800&x-signature=TwoCAwb61y6S5WgzE6qLvqSZ9UI%3D",
					  "originCover": "https://p16-sign-sg.tiktokcdn.com/obj/tos-maliva-p-0068/e66f4a91f7344027a1d810669e9ae36e_1614044489?x-expires=1614106800&x-signature=dcw8cAWMrxpkRQ3VK%2FuQfcpP1f8%3D",
					  "dynamicCover": "https://p16-sign-sg.tiktokcdn.com/obj/tos-maliva-p-0068/50a86c1ff6244894b5d7a7e524265b52_1614044493?x-expires=1614106800&x-signature=WIxlVRaftMgyJgJB8UBKo6r1yOI%3D",
					  "playAddr": "https://v16-web.tiktok.com/video/tos/useast2a/tos-useast2a-pve-0068/5bf7260ddb454770a69af5504005ca8c/?a=1988&br=4138&bt=2069&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&expire=1614107310&l=202102231307320101902092161F0FE04F&lr=tiktok_m&mime_type=video_mp4&pl=0&policy=2&qs=0&rc=M3g3d3E1Ozk4MzMzOjczM0ApOGY6Mzg8OWU5Nzo3ZDs4M2dsa29kc24ybm5gLS1iMTZzc2BfLzUzYjA2L18uMzEtMTE6Yw%3D%3D&signature=7db7b85f595129f501618fc50d7408fe&tk=tt_webid_v2&vl=&vr=",
					  "downloadAddr": "https://v16-web.tiktok.com/video/tos/useast2a/tos-useast2a-pve-0068/5bf7260ddb454770a69af5504005ca8c/?a=1988&br=4138&bt=2069&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&expire=1614107310&l=202102231307320101902092161F0FE04F&lr=tiktok_m&mime_type=video_mp4&pl=0&policy=2&qs=0&rc=M3g3d3E1Ozk4MzMzOjczM0ApOGY6Mzg8OWU5Nzo3ZDs4M2dsa29kc24ybm5gLS1iMTZzc2BfLzUzYjA2L18uMzEtMTE6Yw%3D%3D&signature=7db7b85f595129f501618fc50d7408fe&tk=tt_webid_v2&vl=&vr=",
					  "shareCover": [
						null
					  ],
					  "reflowCover": "https://p16-sign-sg.tiktokcdn.com/obj/tos-maliva-p-0068/9e209ac43d03422555230402d3f4cf07?x-expires=1614106800&x-signature=GC3FZC2q01W6gzUCx2SgLNkOGA0%3D"
					},
					"author": {
					  "id": 6658113054100652000,
					  "uniqueId": "heresyourmonkeycontent",
					  "nickname": "Georgie Boy",
					  "avatarThumb": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1663367077635077~c5_100x100.jpeg?x-expires=1614171600&x-signature=ykouyuQyhAgJhAO%2FkNEIH1AcS50%3D",
					  "avatarMedium": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1663367077635077~c5_720x720.jpeg?x-expires=1614171600&x-signature=Oo9ewQlRjJUH%2BVOPmKyDPAZvIeo%3D",
					  "avatarLarger": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1663367077635077~c5_1080x1080.jpeg?x-expires=1614171600&x-signature=CXugf2YWO%2BJUEtUADeAE2Kj9zmI%3D",
					  "signature": "👆YOUTUBE AND INSTA",
					  "verified": true,
					  "secUid": "MS4wLjABAAAA7CyNvLiT5-wfMyn7_KhW2jJM-QZZMgvDH9UjKnlgd2pCWpyI0PUewJn-f_hLOuMD",
					  "secret": true,
					  "ftc": true,
					  "relation": 1,
					  "openFavorite": true,
					  "commentSetting": 0,
					  "duetSetting": 0,
					  "stitchSetting": 0,
					  "privateAccount": true
					},
					"music": {
					  "id": 6932268233760509000,
					  "title": "original sound",
					  "playUrl": "https://sf16-ies-music-va.tiktokcdn.com/obj/musically-maliva-obj/6932268236901731077.mp3",
					  "coverThumb": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1663367077635077~c5_100x100.jpeg?x-expires=1614171600&x-signature=ykouyuQyhAgJhAO%2FkNEIH1AcS50%3D",
					  "coverMedium": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1663367077635077~c5_720x720.jpeg?x-expires=1614171600&x-signature=Oo9ewQlRjJUH%2BVOPmKyDPAZvIeo%3D",
					  "coverLarge": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1663367077635077~c5_1080x1080.jpeg?x-expires=1614171600&x-signature=CXugf2YWO%2BJUEtUADeAE2Kj9zmI%3D",
					  "authorName": "Georgie Boy",
					  "original": true,
					  "duration": 58,
					  "album": null
					},
					"challenges": [
					  {
						"id": 22453,
						"title": "monkey",
						"desc": null,
						"profileThumb": null,
						"profileMedium": null,
						"profileLarger": null,
						"coverThumb": null,
						"coverMedium": null,
						"coverLarger": null,
						"isCommerce": true
					  }
					],
					"stats": {
					  "diggCount": 16000,
					  "shareCount": 612,
					  "commentCount": 393,
					  "playCount": 80200
					},
					"duetInfo": {
					  "duetFromId": 0
					},
					"originalItem": true,
					"officalItem": true,
					"textExtra": [
					  {
						"awemeId": null,
						"start": 82,
						"end": 89,
						"hashtagName": "monkey",
						"hashtagId": null,
						"type": 1,
						"userId": null,
						"isCommerce": true,
						"userUniqueId": null,
						"secUid": null
					  }
					],
					"secret": true,
					"forFriend": true,
					"digged": true,
					"itemCommentStatus": 0,
					"showNotPass": true,
					"vl1": true,
					"itemMute": true,
					"authorStats": {
					  "followingCount": 282,
					  "followerCount": 12900000,
					  "heartCount": 142600000,
					  "videoCount": 455,
					  "diggCount": 1443,
					  "heart": 142600000
					},
					"privateItem": true,
					"duetEnabled": true,
					"stitchEnabled": true,
					"shareEnabled": true,
					"stickersOnItem": [
					  {
						"stickerType": 0
					  }
					],
					"isAd": true
				  }
				],
				"cursor": 1611774375000,
				"hasMore": true
			}
		},
		likes: {
			help: "Get liked posts of an user",
			path: "/public/likes",
			params: {
				secUid: {
					required: true,
					validate: "^(.*?){30,}$",
					help: "The user secUid",
					example: "MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud"
				},
				count: {
					example: 5,
					default: 30,
					validate: "^[0-9]{1,2}$"
				},
				cursor: {
					validate: "^[0-9]+$"
				}
			},
		},
		video: {
			path: "/public/video",
			help: "Get a video information/ Download a video",
			params: {
				id: {
					required: true,
					help: "The video ID",
					example: "6950501241915018501",
					validate: "^[0-9]+$"
				},
				username: {
					help: "The author username",
					example: "lilyachty",
					required: false,
					required: true
				},
				download: {
					help: "Set this to `1` to get a mp4 file",
					default: 0,
					in: [0,1]
				}
			}
		},

		discover: {
			$help: "Search users, music, hashtags",
			users: {
				path: "/public/discover/users",
				params: {
					keyword: {},
					count: {
						default: 30,
						validate: "^[0-9]{1,2}$"
					},
					cursor: {
						validate: "^[0-9]+$"
					},
					country: {
						required: false,
						validate: "^[a-z]{,2}$"
					}
				}
			},
			music: {
				path: "/public/discover/music",
				params: {
					keyword: {
						example: 'lilyachty'
					},
					count: {
						default: 30,
						validate: "^[0-9]{1,2}$"
					},
					cursor: {
						validate: "^[0-9]+$"
					},
					country: {
						required: false,
						validate: "^[a-z]{,2}$"
					}
				},
				example_response: {
					"status": "success",
					"message": null,
					"musicInfoList": [
					  {
						"music": {
						  "album": "Hey Julie! (feat. Lil Yachty)",
						  "authorName": "KYLE",
						  "coverLarge": "https://p16-sg.tiktokcdn.com/aweme/720x720/tos-alisg-i-0000/d03864babe5c4c1ea2106db77909807e.jpeg",
						  "coverMedium": "https://p16-sg.tiktokcdn.com/aweme/200x200/tos-alisg-i-0000/d03864babe5c4c1ea2106db77909807e.jpeg",
						  "coverThumb": "https://p16-sg.tiktokcdn.com/aweme/100x100/tos-alisg-i-0000/d03864babe5c4c1ea2106db77909807e.jpeg",
						  "duration": 33,
						  "id": 6659459073378995000,
						  "original": true,
						  "playUrl": "https://sf16-ies-music-sg.tiktokcdn.com/obj/tiktok-obj/030aee3fc6cf3eecf1b97b08c344d392.mp3",
						  "title": "Hey Julie! (feat. Lil Yachty)"
						},
						"stats": {
						  "videoCount": 5600000
						}
					  }
					],
					"offset": 10,
					"statusCode": 0
				  }
			},
			hashtag: {
				path: "/public/discover/hashtag",
				params: {
					keyword: {
						example: 'lilyachty'
					},
					count: {
						default: 30,
						validate: "^[0-9]{1,2}$"
					},
					cursor: {
						validate: "^[0-9]+$"
					},
					country: {
						required: false,
						validate: "^[a-z]{,2}$"
					}
				},
				example_response: {

				}
			}
		},
		hashtag: {
			help: "Get posts by hashtag ID (You can find it using Discover endpoint)",
			path: "/public/hashtag",
			params: {
				id: {
					required: false,
					validate: "^[0-9]+$",
					help: "The hashtag ID"
				},
				name: {
					required: false,
					help: "The hashtag name"
				},
				count: {
					default: 30,
					validate: "^[0-9]{1,2}$"
				},
				cursor: {
					validate: "^[0-9]+$",
					help: "The starting point of items list"
				},
				country: {
					required: false,
					validate: "^[a-z]{,2}$"
				}
			},
			example_response: {
				"status": "success",
				"message": "string",
				"itemStruct": {
				  "cursor": 60,
				  "hasMore": true,
				  "itemList": [
					{
					  "author": {
						"avatarLarger": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/ed46bcdd5e318d4670f26aec440e2052~c5_1080x1080.jpeg?x-expires=1618480800&x-signature=tKuHC7eXYB343bslQKrw41UN%2FIo%3D",
						"avatarMedium": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/ed46bcdd5e318d4670f26aec440e2052~c5_720x720.jpeg?x-expires=1618480800&x-signature=OjnTsyKRskBVTj%2Fi2spU%2F%2FEEgvA%3D",
						"avatarThumb": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/ed46bcdd5e318d4670f26aec440e2052~c5_100x100.jpeg?x-expires=1618480800&x-signature=Bq6J1aq3O248fvPcZZXyj5uI6JI%3D",
						"commentSetting": 0,
						"duetSetting": 0,
						"ftc": true,
						"id": "6743547525321xxxxx",
						"nickname": "RAP",
						"openFavorite": true,
						"privateAccount": true,
						"relation": 0,
						"secUid": "MS4wLjABAAAAyZX6.",
						"secret": true,
						"signature": "Link in bio",
						"stitchSetting": 0,
						"uniqueId": "rap",
						"verified": true
					  },
					  "authorStats": {
						"diggCount": 5795,
						"followerCount": 5400000,
						"followingCount": 434,
						"heart": 200100000,
						"heartCount": 200100000,
						"videoCount": 2405
					  },
					  "challenges": [
						{
						  "coverLarger": null,
						  "coverMedium": null,
						  "coverThumb": null,
						  "desc": null,
						  "id": 656,
						  "isCommerce": true,
						  "profileLarger": null,
						  "profileMedium": null,
						  "profileThumb": null,
						  "title": "bobbyshmurda"
						}
					  ],
					  "createTime": 1615085843,
					  "desc": null,
					  "digged": true,
					  "duetEnabled": true,
					  "duetInfo": {
						"duetFromId": 0
					  },
					  "forFriend": true,
					  "id": 6936740859383680000,
					  "isAd": true,
					  "itemCommentStatus": 0,
					  "itemMute": true,
					  "music": {
						"album": null,
						"authorName": "RAP",
						"coverLarge": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/ed46bcdd5e318d4670f26aec440e2052~c5_1080x1080.jpeg?x-expires=1618480800&x-signature=tKuHC7eXYB343bslQKrw41UN%2FIo%3D",
						"coverMedium": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/ed46bcdd5e318d4670f26aec440e2052~c5_720x720.jpeg?x-expires=1618480800&x-signature=OjnTsyKRskBVTj%2Fi2spU%2F%2FEEgvA%3D",
						"coverThumb": "https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/ed46bcdd5e318d4670f26aec440e2052~c5_100x100.jpeg?x-expires=1618480800&x-signature=Bq6J1aq3O248fvPcZZXyj5uI6JI%3D",
						"duration": 15,
						"id": 6936740754928717000,
						"original": true,
						"playUrl": "https://sf16-ies-music-va.tiktokcdn.com/obj/musically-maliva-obj/6936740824692558597.mp3",
						"title": "original sound"
					  },
					  "officalItem": true,
					  "originalItem": true,
					  "privateItem": true,
					  "secret": true,
					  "shareEnabled": true,
					  "showNotPass": true,
					  "stats": {
						"commentCount": 5270,
						"diggCount": 232700,
						"playCount": 2100000,
						"shareCount": 2957
					  },
					  "stickersOnItem": [
						{
						  "stickerText": [
							"Bobby Shmurda pulling up to All Star weekend🔥"
						  ],
						  "stickerType": 4
						}
					  ],
					  "stitchEnabled": true,
					  "textExtra": [
						{
						  "awemeId": null,
						  "end": 13,
						  "hashtagId": 656,
						  "hashtagName": "bobbyshmurda",
						  "isCommerce": true,
						  "secUid": null,
						  "start": 0,
						  "type": 1,
						  "userId": null,
						  "userUniqueId": null
						}
					  ],
					  "video": {
						"cover": "https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/43bdcd4b086446f68ece8ec7289845fc?x-expires=1618416000&x-signature=rMQAUzfMneoP%2B8bHXKGSfwIfxTU%3D",
						"downloadAddr": "https://v16-web.tiktok.com/video/tos/useast2a/tos-useast2a-ve-0068c003/3f83725baa75439ea8ba764a2ab6dd75/?a=1988&br=3120&bt=1560&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&expire=1618419556&l=202104141059010101890531331400A966&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&policy=2&qs=0&rc=anc4Zjw4aDY3NDMzOTczM0ApOTNlOmQ0Nzw7NzZoZjY2ZWdrLTJgcTYxLy9gLS1iMTZzczQuYl8uMGE2MTYvMmEzM2I6Yw%3D%3D&signature=5c842ee10fd13d7947cc6f52a0c04d82&tk=tt_webid_v2&vl=&vr=",
						"duration": 15,
						"dynamicCover": "https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/def4c536e245468ba0404da490337aeb_1615085845?x-expires=1618416000&x-signature=NTiyZa3N5mddjNvoFtDyznzRH6A%3D",
						"height": 1024,
						"id": 6936740859383680000,
						"originCover": "https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/28baaa197b1440fdb0aa9795106b8825_1615085845?x-expires=1618416000&x-signature=veEGB6CU9nZIDTFaEwOOU0gHbjY%3D",
						"playAddr": "https://v16-web.tiktok.com/video/tos/useast2a/tos-useast2a-ve-0068c003/3f83725baa75439ea8ba764a2ab6dd75/?a=1988&br=3120&bt=1560&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&expire=1618419556&l=202104141059010101890531331400A966&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&policy=2&qs=0&rc=anc4Zjw4aDY3NDMzOTczM0ApOTNlOmQ0Nzw7NzZoZjY2ZWdrLTJgcTYxLy9gLS1iMTZzczQuYl8uMGE2MTYvMmEzM2I6Yw%3D%3D&signature=5c842ee10fd13d7947cc6f52a0c04d82&tk=tt_webid_v2&vl=&vr=",
						"ratio": "720p",
						"reflowCover": "https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/43bdcd4b086446f68ece8ec7289845fc?x-expires=1618416000&x-signature=rMQAUzfMneoP%2B8bHXKGSfwIfxTU%3D",
						"shareCover": [
						  null
						],
						"width": 576
					  },
					  "vl1": true
					}
				  ],
				  "message": null,
				  "status": "success",
				  "statusCode": 0
				}
			}
		},
		music: {
			help: "Get posts by music ID",
			path: "/public/music",
			params: {
				id: {
					required: true,
					validate: "^[0-9]+$",
					help: "The music ID"
				},
				count: {
					default: 30,
					validate: "^[0-9]{1,2}$"
				},
				cursor: {
					validate: "^[0-9]+$",
					help: "The starting point of items list"
				},
				country: {
					required: false,
					validate: "^[a-z]{,2}$"
				}
			}
		},
	},

	user: {
		help: 'The user endpoints require an `accountKey`',

		$options: {
			params: {
				apiKey: {
					name: "X-API-KEY",
					required: true,
					location: "headers",
					validate: "^[a-zA-Z0-9]{10,}$",
					example: 'myAPIKey'
				},
				accountKey: {
					name: "X-ACCOUNT-KEY",
					required: true,
					help: "You can get Account Key with OAuth, or Add a Test user on your dashboard.",
					location: "headers",
					validate: "^[a-zA-Z0-9]{10,}$",
					example: 'myAccountKey'
				}
				
			}
		},

		profile: {
			info: {
				help: "Get current user profile information",
				path: "/user/info",
				example_response: {
					"status": "success",
					"message": "string",
					"statusCode": 0,
					"userInfo": {
					  "user": {
						"id": 684574219000000000,
						"uniqueId": "lilyachty",
						"nickname": "lilyachty",
						"avatarThumb": "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tiktok-obj/db20c99f44182ab54cca90de85f673bf.jpeg?x-expires=1606165200&x-signature=pw%2BueamaONA9LQMd7h0Pyyb0%2FAY%3D",
						"avatarMedium": "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tiktok-obj/db20c99f44182ab54cca90de85f673bf.jpeg?x-expires=1606165200&x-signature=8FzlgFpqsP8ZPLJhxDKmqHyJ0N0%3D",
						"avatarLarger": "https://p16-sign-sg.tiktokcdn.com/aweme/1080x1080/tiktok-obj/db20c99f44182ab54cca90de85f673bf.jpeg?x-expires=1606165200&x-signature=SYNT1mnTj7VipZCFrh8FrmVsRJU%3D",
						"signature": null,
						"verified": true,
						"secUid": "MS4wLjABAAAA77...........",
						"secret": true,
						"ftc": true,
						"relation": 0,
						"openFavorite": true,
						"commentSetting": 0,
						"duetSetting": 0,
						"stitchSetting": 0,
						"privateAccount": true
					  },
					  "stats": {
						"followingCount": 0,
						"followerCount": 0,
						"heartCount": 0,
						"videoCount": 0,
						"diggCount": 0,
						"heart": 0
					  },
					  "shareMeta": {
						"title": "lilyachty on TikTok",
						"desc": "@lilyachty 0 Followers 0 Following 0 Likes - Watch awesome short videos created by lilyachty"
					  }
					}
				}
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
				},
				example_response: {
					"status": "success",
					"message": null,
					"extra": {
					  "fatal_item_ids": [],
					  "logid": "202104141323300101901...",
					  "now": 1618406620418
					},
					"log_pb": {
					  "impr_id": "202104141323300101..."
					},
					"status_code": 0,
					"user": {
					  "apple_account": 0,
					  "avatar_larger": {
						"uri": "tiktok-obj/db20c99f44182ab54cca90de85f673bf",
						"url_list": [
						  "https://p16-sign-sg.tiktokcdn.com..."
						]
					  },
					  "avatar_medium": {
						"uri": "tiktok-obj/db20c99f44182ab54cca90de85f673bf",
						"url_list": [
						  "https://p16-sign-sg.tiktokcdn.com..."
						]
					  },
					  "avatar_thumb": {
						"uri": "tiktok-obj/db20c99f44182ab54cca90de85f673bf",
						"url_list": [
						  "https://p16-sign-sg.tiktokcdn.com..."
						]
					  },
					  "google_account": null,
					  "ins_id": null,
					  "nickname": "demoapi",
					  "secret": 0,
					  "self_visible_avatar_larger": {
						"uri": "1080x1080/tiktok-obj/db20c99f44182ab54cca90de85f673bf",
						"url_list": [
						  "https://p16-sign-sg.tiktokcdn.com..."
						]
					  },
					  "self_visible_avatar_medium": {
						"uri": "720x720/tiktok-obj/db20c99f44182ab54cca90de85f673bf",
						"url_list": [
						  "https://p16-sign-sg.tiktokcdn..."
						]
					  },
					  "self_visible_avatar_thumb": {
						"uri": "100x100/tiktok-obj/db20c99f44182ab54cca90de85f673bf",
						"url_list": [
						  "https://p16-sign-sg..."
						]
					  },
					  "share_qrcode_uri": null,
					  "short_id": 0,
					  "signature": "My new bio!",
					  "twitter_id": null,
					  "twitter_name": null,
					  "uid": "6845742198232xxxxxx",
					  "unique_id": "demoapi",
					  "verification_type": 0,
					  "video_icon": {
						"uri": null,
						"url_list": []
					  },
					  "youtube_channel_id": null,
					  "youtube_channel_title": null
					}
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
				count: {
					default: 20,
					max: 20,
					validate: "^[0-9]{1,2}$"
				},
				maxTime: {
					name: 'max_time',
					validate: "^[0-9]+$"
				},
				minTime: {
					name: 'min_time',
					validate: "^[0-9]+$"
				}
			}
		},

		followers: {
			help: "[Deprecated] Get followers list",
			path: "/user/followers",
			params: {
				count: {
					default: 30,
					validate: "^[0-9]{1,2}$"
				},
				maxTime: {
					name: 'max_time',
					validate: "^[0-9]+$"
				},
				minTime: {
					name: 'min_time',
					validate: "^[0-9]+$"
				}
			}
		},

		following: {
			help: "Get following list",
			path: "/user/following",
			params: {
				count: {
					default: 30,
					validate: "^[0-9]{1,2}$"
				},
				cursor: {
					validate: "^[0-9]+$"
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
					example: 'lilyachty',
					required: true
				},
				userId: {
					example: '6569595380449902597',
					name: 'user_id',
					required: true
				}
			},
			example_response: {
				"status": "success",
				"message": "string",
			}
		},

		unfollow: {
			help: "Unfollows an user",
			path: "/user/follow",
			method: "POST",
			enctype: "json",
			params: {
				username: {
					example: 'lilyachty',
					required: true
				},
				userId: {
					name: 'user_id',
					example: '6569595380449902597',
					help: "The user ID",
					required: true
				}
			},
			example_response: {
				"status": "success",
				"message": "string",
			}
		},
		
		feed: {
			help: "Get user feed posts",
			path: "/user/feed",
			params: {
				count: {
					default: 30,
					validate: "^[0-9]{1,2}$"
				},
				cursor: {
					validate: "^[0-9]+$"
				},
				secUid: {
					validate: "^(.*?){30,}$"
				}
			}
		},

		likes: {
			help: "Get user liked posts",
			path: "/user/likes",
			params: {
				count: {
					default: 30,
					validate: "^[0-9]{1,2}$"
				},
				id: {
					validate: "^[0-9]+$"
				},
				secUid: {
					validate: "^(.*?){30,}$"
				},
				maxTime: {
					name: 'max_time',
					validate: "^[0-9]+$"
				},
				minTime: {
					name: 'min_time',
					validate: "^[0-9]+$"
				},
			}
		},

		explore: {
			help: "Get recommended posts",
			path: "/user/explore",
			params: {
				count: {
					default: 30,
					validate: "^[0-9]{1,2}$"
				}
			}
		},

		posts: {
			info: {
				help: "Get video information/Download video",
				path: "/public/video",
				params: {
					id: {
						example: "6950501241915018501",
						help: "The video ID",
						validate: "^[0-9]+$",
						required: true
					},
					download: {
						default: 0,
						in: [0,1]
					}
				}
			},
			like: {
				help: "Like a video",
				path: "/user/like",
				method: "POST",
				enctype: "json",
				params: {
					mediaId: {
						example: "6950501241915018501",
						help: "The video ID",
						name: "media_id",
						required: true,
						validate: "^[0-9]+$"
					}
				},
				example_response: {
					"status": "success",
					"message": "string",
				}
			},
			unlike: {
				help: "Unlike a video",
				path: "/user/like",
				method: "POST",
				enctype: "json",
				params: {
					mediaId: {
						example: "6950501241915018501",
						name: "media_id",
						required: true,
						help: "The video ID",
						validate: "^[0-9]+$"
					}
				},
				example_response: {
					"status": "success",
					"message": "string",
				}
			},
			comments: {
				list: {
					help: "Get a video comments list",
					path: "/comment/list",
					params: {
						mediaId: {
							name: "media_id",
							example: "6950501241915018501",
							required: true,
							help: "The video ID",
							validate: "^[0-9]+$"
						},
						count: {
							default: 20,
							min: 20,
							validate: "^[0-9]{1,2}$"
						},
						cursor: {
							validate: "^[0-9]+$"
						},
						authorId: {
							name: 'author_id'
						},
						authorUsername: {
							name: 'author_username'
						}
					}
				},
				replies: {
					help: "Get a comment reply list",
					path: "/comment/reply/list",
					params: {
						mediaId: {
							name: "media_id",
							required: true,
							help: "The video ID",
							example: "6950501241915018501",
							validate: "^[0-9]+$"
						},
						commentId: {
							name: "comment_id",
							help: "The comment ID",
							example: "6950502632121548805",
							required: true,
							validate: "^[0-9]+$"
						},
						count: {
							default: 20,
							validate: "^[0-9]{1,2}$"
						}
					}
				},
				make: {
					path: "/user/comment",
					method: "POST",
					enctype: "json",
					help: "Post a new comment",
					params: {
						mediaId: {
							name: "media_id",
							required: true,
							validate: "^[0-9]+$",
							help: "The video ID",
							example: "6950501241915018501",
						},
						text: {
							required: true,
							example: "That's cool"
						},
						commentId: {
							name: "reply_comment_id",
							validate: "^[0-9]+$",
							help: "You can reply to a comment by including a comment ID"
						},
						has_tags: {},
						authorId: {
							name: 'author_id'
						},
						authorUsername: {
							name: 'author_username'
						}
					},
					example_response: {
						"status": "success",
						"message": "string",
						"comment": {
						  "text": "Thats cool",
						  "aweme_id": 69095729000000000,
						  "digg_count": 0,
						  "user": {},
						  "reply_id": 0,
						  "text_extra": [],
						  "reply_to_reply_id": 0,
						  "cid": 69102083240000000,
						  "status": 7,
						  "user_digged": 0,
						  "reply_comment": [],
						  "label_list": "string",
						  "create_time": 16089000000
						},
						"label_info": null,
						"extra": {},
						"log_pb": {},
						"status_code": 0,
						"status_msg": "Comment sent successfully"
					  }
				},
				like: {
					help: "Like a comment",
					path: "/user/comment/like",
					method: "POST",
					enctype: "json",
					params: {
						mediaId: {
							name: "media_id",
							required: true,
							validate: "^[0-9]+$",
							example: "6950501241915018501",
							help: "The video ID"
						},
						commentId: {
							name: "comment_id",
							required: true,
							validate: "^[0-9]+$",
							help: "The comment ID",
							example: "6950502632121548805"
						},
						authorId: {
							name: 'author_id'
						},
						authorUsername: {
							name: 'author_username'
						}
					},
					example_response: {
						"status": "success",
						"message": "string",
					}
				},
				unlike: {
					help: "Unlike a comment",
					path: "/user/comment/unlike",
					method: "POST",
					enctype: "json",
					params: {
						mediaId: {
							name: "media_id",
							required: true,
							validate: "^[0-9]+$",
							example: "6950501241915018501",
							help: "The video ID"
						},
						commentId: {
							name: "comment_id",
							required: true,
							validate: "^[0-9]+$",
							help: "The comment ID",
							example: "6950502632121548805"
						},
						authorId: {
							name: 'author_id'
						},
						authorUsername: {
							name: 'author_username'
						}
					},
					example_response: {
						"status": "success",
						"message": "string",
					}
				}
			}
		},

		conversations: {
			path: '/user/conversations',
			help: "Get user conversations",
			params: {
				cursor: {
					validate: "^[0-9]+$"
				}
			},
			example_response: {
				"hasMore": false,
				"nextCursor": "1",
				"perUserCursor": "161830000000000",
				"conversations": [
					{
						"conversationType": 1,
						"favorite": 0,
						"id": "0:1:684574219823xxxxxxx:694024352038xxxxxxx",
						"inboxType": 0,
						"isParticipant": true,
						"messages": [
							{
								"content": {
									"aweType": 0
								},
								"createTime": "1618000000000",
								"senderSecUid": "MS4wLjABAAAA77.....",
								"senderUid": "684574219xxxxxxxxx",
								"status": 0,
								"text": "Hello!",
								"version": "0"
							},
							{
								"content": {
									"aweType": 700,
									"isDefault": false,
									"is_card": false,
									"mSendStartTime": 1618260000000,
									"msgHint": "",
									"type": 0
								},
								"createTime": "16182628000000",
								"senderSecUid": "MS4wLjABAAAA77.......",
								"senderUid": "684574219xxxxxxxx",
								"status": 0,
								"text": "hi, whatsup",
								"version": "0"
							}
						],
						"mute": 0,
						"notice": "",
						"ownerSecUid": "MS4wLjABAAAAg.......",
						"ownerUid": "694024352xxxxxx",
						"participantsCount": 2,
						"participantsUid": [
							"684574219xxxxxxxx",
							"694024352xxxxxxxx"
						],
						"short_id": "694024514xxxxxxx",
						"ticket": "z5fP0jzMCTIoG......"
					}
				],
				"error_desc": "OK",
				"inbox_type": 0,
				"log_id": "202104171926xxxxxxxxx",
				"message": "",
				"sequence_id": "0",
				"status": "success",
				"status_code": 0
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
				cursor: {
					validate: "^[0-9]+$"
				},
				limit: {
					validate: "^[0-9]{1,2}$"
				}
			},
			example_response: {
				"hasMore": true,
				"nextCursor": 161590272500000,
				"messages": [
					{
						"text": "heeey",
						"createTime": 1615900000000,
						"isStranger": true,
						"senderSecUid": "MS4wLjABAAA...",
						"senderUid": "69402435......",
						"status": 0,
						"type": 7,
						"clientMessageId": "8046dd57...",
						"content": {
							"aweType": 700,
							"isDefault": true,
							"is_card": true,
							"mSendStartTime": 1615900000000,
							"msgHint": null,
							"type": 0
						}
					}
				],
				"status": "success",
				"message": null,
				"error_desc": "OK",
				"inbox_type": 0,
				"log_id": "20210414132....",
				"sequence_id": 10005,
				"status_code": 0
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
				},
				example_response: {
					"status": "success",
					"message": null,
					"room": {
						"cover": {
							"avg_color": null,
							"height": 0,
							"image_type": 0,
							"is_animated": true,
							"open_web_url": null,
							"uri": "tiktok-obj/db20c99f44182xxxxxxxxxxxxxx",
							"url_list": [
								"https://p16-webcast.tiktokcdn.com/img/alisg/tiktok-obj/db20c99f44182ab54cca90de8xxxxxx~tplv-obj.image"
							],
							"width": 0
						},
						"create_time": 1618500000000,
						"id": "6951455042083xxxxxx",
						"share_url": "https://m.tiktok.com/share/live/6951455042083xxxxx/?language=en&u_code=dd8i6568e8a8e8",
						"status": 1
					},
					"stream": {
						"id": "29909202465xxxxx",
						"pull": {
							"default_resolution": "FULL_HD1",
							"flv": {
								"FULL_HD1": "https://pull-f5-va01.tiktokcdn.com/game/stream-29909202465xxxxx_uhd.flv",
								"HD1": "https://pull-f5-va01.tiktokcdn.com/game/stream-29909202465647xxxx_hd.flv",
								"SD1": "https://pull-f5-va01.tiktokcdn.com/game/stream-29909202465647xxxxxx_ld.flv",
								"SD2": "https://pull-f5-va01.tiktokcdn.com/game/stream-29909202465647xxxxxxx_sd.flv"
							},
							"hls": "https://pull-hls-f16-va01.tiktokcdn.com/game/stream-2990920246564xxxxxxx/index.m3u8",
							"rtmp": "https://pull-f5-va01.tiktokcdn.com/game/stream-2990920246564xxxxxxx.flv"
						},
						"push": {
							"key": "stream-299092024xxxxxxx?expire=1619116601&sign=3c61ba05715befe6xxxxxxxxxxxxxx",
							"server": "rtmp://push-rtmp-f5-va01.tiktokcdn.com/game",
							"url": "rtmp://push-rtmp-f5-va01.tiktokcdn.com/game/stream-299092024656xxxxxxx?expire=1619116601&sign=3c61ba05715befe6xxxxxxxxxxxxxx"
						}
					}
				}
			},
			stop: {
				help: 'Stop a live video',
				path: '/user/live/stop',
				method: 'POST',
				enctype: 'json',
				example_response: {
					"status": "success",
					"message": ""
				}
			},
			info: {
				help: 'Get a live video information',
				path: '/user/live/check',
				params: {
					roomId: {
						name: 'room_id',
						required: true
					}
				},
				example_response: "{...}"
			},
			recommend: {
				help: 'Get recommended live videos based on a live video',
				path: '/user/live/recommend',
				params: {
					roomId: {
						name: 'room_id',
						required: true
					}
				},
				example_response: "{...}"
			},
			stats: {
				help: 'Get a ended live video statistics',
				path: '/user/live/stats',
				params: {
					roomId: {
						name: 'room_id',
						required: true
					}
				},
				example_response: {
					"status": "success",
					"message": null,
					"data": {
						"period_stats": {
							"decimal_num": 2,
							"stats_type": 0,
							"value": 4493
						},
						"room_stats": {
							"live_comment_ucnt": 0,
							"live_consume_ucnt": 0,
							"live_end_time": "2021-04-17T19:30:44.386Z",
							"live_like_cnt": 0,
							"live_new_fans_ucnt": 0,
							"live_pause_duration": 0,
							"live_start_time": "2021-04-17T19:30:44.386Z",
							"live_watch_ucnt": 4,
							"room_id": '695140311xxxxxxxxx',
							"total_score": 0
						}
					},
					"extra": {
						"now": 161850000000000
					},
					"status_code": 0
				}
			},
			enter: {
				path: '/user/live/enter',
				params: {
					roomId: {
						name: 'room_id',
						required: true
					}
				},
				example_response: '{...}'
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
			overview: {
				path: "/creator/analytics/overview",
				params: {
					days: {
						default: 7,
						validate: "^[0-9]+$"
					}
				},
				example_response: "{...}"
			},
			content: {
				path: "/creator/analytics/content",
				params: {
					days: {
						default: 7,
						validate: "^[0-9]+$"
					}
				},
				example_response: "{...}"
			},
			video: {
				path: "/creator/analytics/video",
				params: {
					days: {
						default: 7,
						validate: "^[0-9]+$"
					},
					mediaId: {
						name: "media_id",
						required: true,
						validate: "^[0-9]+$"
					}
				},
				example_response: "{...}"
			},
			followers: {
				path: "/creator/analytics/followers",
				params: {
					days: {
						default: 7,
						validate: "^[0-9]+$"
					}
				},
				example_response: "{...}"
			},
			live: {
				path: "/creator/analytics/live",
				params: {
					days: {
						default: 7,
						validate: "^[0-9]+$"
					}
				},
				example_response: "{...}"
			}
		},
	}
};

const api = function (apiKey) {
	if(!apiKey) {
		throw new Error("A valid API Key is required.");
	}
	return Wrape(endpoints, {
		base: "https://api.tikapi.io",
		params: {
			apiKey: {
				name: "X-API-KEY",
				required: true,
				location: "headers",
				validate: "^[a-zA-Z0-9]{10,}$",
				example: 'myAPIKey'
			}
		},
		values: {
			apiKey: apiKey
		}
	});
}

module.exports = api;