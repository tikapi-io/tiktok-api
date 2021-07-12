# Unofficial TikTok API 

A fully managed hassle-free TikTok API solution with OAuth capabilities. 
You can get started instantly, all you need is an API Key.

Get one at https://tikapi.io

*Note: Spam/Abuse/Follower selling services are strictly not allowed.*

## Installation

`npm i tikapi`


## Usage
```javascript
const api = require("tikapi")("myApiKey");

(async () => {
    try {
        var user_information = await api.public.user({
			username: 'lilyachty'
		});
        console.log(user_information);
    } catch (error) {
        console.log(error);
    }
})();

```

## Reference

SDK And Documentation made with https://github.com/elis-k/wrape

- [public](#api-public)
	- [user](#api-public-user)
	- [explore](#api-public-explore)
	- [posts](#api-public-posts)
	- [liked](#api-public-likes)
	- [video](#api-public-video)
	- [discover](#api-public-discover)
		- [users](#api-public-discover-users)
		- [music](#api-public-discover-music)
		- [hashtags](#api-public-discover-hashtags)
	- [hashtag](#api-public-hashtag)
	- [music](#api-public-music)
- [user](#api-user)
	- [profile](#api-user-profile)
		- [info](#api-user-profile-info)
		- [edit](#api-user-profile-edit)
	- [notifications](#api-user-notifications)
	- [followers](#api-user-followers)
	- [following](#api-user-following)
	- [follow](#api-user-follow)
	- [unfollow](#api-user-unfollow)
	- [feed](#api-user-feed)
	- [likes](#api-user-likes)
	- [explore](#api-user-explore)
	- [posts](#api-user-posts)
		- [info](#api-user-posts-info)
		- [like](#api-user-posts-like)
		- [unlike](#api-user-posts-unlike)
		- [comments](#api-user-posts-comments)
			- [list](#api-user-posts-comments-list)
			- [replies](#api-user-posts-comments-replies)
			- [make](#api-user-posts-comments-make)
			- [like](#api-user-posts-comments-like)
			- [unlike](#api-user-posts-comments-unlike)
	- [conversations](#api-user-conversations)
	- [messages](#api-user-messages)
	- [live](#api-user-live)
		- [start](#api-user-live-start)
		- [stop](#api-user-live-stop)
		- [info](#api-user-live-info)
		- [recommend](#api-user-live-recommend)
		- [stats](#api-user-live-stats)
		- [enter](#api-user-live-enter)
	- [search](#api-user-search)
	- [analytics](#api-user-analytics)
		- [overview](#api-user-analytics-overview)
		- [content](#api-user-analytics-videos)
		- [video](#api-user-analytics-video)
		- [followers](#api-user-analytics-followers)
		- [live](#api-user-analytics-live)


<h2 id="api-public">Public</h2>

Public endpoints do not require an user authorization
<h3 id="api-public-user">User</h3>

Get user profile information
```javascript
api.public.user({
	username: "lilyachty", //required
	//secUid: "<any>", //optional | Validate: ^(.*?){30,}$
})
```

<details>
<summary>Request</summary>

**GET** /public/check
|Parameter|Location|Required|Description|
|--|--|--|--|
username|query|true|The TikTok account username
secUid|query|false|The TikTok user secUid
</details>

<details>
<summary>Response</summary>

```json
{
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
```
</details>

<h3 id="api-public-explore">Explore</h3>

Get recommended posts
```javascript
api.public.explore({
	//count: 5, //optional | Validate: ^[0-9]{1,2}$
})
```

<details>
<summary>Request</summary>

**GET** /public/explore
|Parameter|Location|Required|Description|
|--|--|--|--|
count|query|false|
</details>

<h3 id="api-public-posts">Posts</h3>

Get posts of an user
```javascript
api.public.posts({
	secUid: "MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud", //required | Validate: ^(.*?){30,}$
	//count: 5, //optional | Validate: ^[0-9]{1,2}$
	//cursor: "<any>", //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /public/posts
|Parameter|Location|Required|Description|
|--|--|--|--|
secUid|query|true|The user secUid
count|query|false|
cursor|query|false|
</details>

<details>
<summary>Response</summary>

```json
{
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
```
</details>


<h3 id="api-public-likes">Liked</h3>

Get liked posts of an user
```javascript
api.public.likes({
	secUid: "MS4wLjABAAAAsHntXC3s0AvxcecggxsoVa4eAiT8OVafVZ4OQXxy-9htpnUi0sOYSr0kGGD1Loud", //required | Validate: ^(.*?){30,}$
	//count: 5, //optional | Validate: ^[0-9]{1,2}$
	//cursor: "<any>", //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /public/likes
|Parameter|Location|Required|Description|
|--|--|--|--|
secUid|query|true|The user secUid
count|query|false|
cursor|query|false|
</details>

<h3 id="api-public-video">Video</h3>

Get a video information/ Download a video
```javascript
api.public.video({
	id: "6950501241915018501", //required | Validate: ^[0-9]+$
	//username: "lilyachty", //optional
	//download: "<any>", //optional | Allowed: 0, 1
})
```

<details>
<summary>Request</summary>

**GET** /public/video
|Parameter|Location|Required|Description|
|--|--|--|--|
id|query|true|The video ID
username|query|false|The author username
download|query|false|Set this to `1` to get a mp4 file
</details>

<h3 id="api-public-discover">Discover</h3>

Search users, music, hashtags
<h4 id="api-public-discover-users">Users</h4>

```javascript
api.public.discover.users({
	//keyword: "<any>", //optional
	//count: 30, //optional | Validate: ^[0-9]{1,2}$
	//cursor: "<any>", //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /public/discover/users
|Parameter|Location|Required|Description|
|--|--|--|--|
keyword|query|false|
count|query|false|
cursor|query|false|
</details>

<h4 id="api-public-discover-music">Music</h4>

```javascript
api.public.discover.music({
	//keyword: "lilyachty", //optional
	//count: 30, //optional | Validate: ^[0-9]{1,2}$
	//cursor: "<any>", //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /public/discover/music
|Parameter|Location|Required|Description|
|--|--|--|--|
keyword|query|false|
count|query|false|
cursor|query|false|
</details>

<details>
<summary>Response</summary>

```json
{
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
```
</details>

<h4 id="api-public-discover-hashtags">Hashtags</h4>

```javascript
api.public.discover.hashtags({
	//keyword: "lilyachty", //optional
	//count: 30, //optional | Validate: ^[0-9]{1,2}$
	//cursor: "<any>", //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /public/discover/hashtag
|Parameter|Location|Required|Description|
|--|--|--|--|
keyword|query|false|
count|query|false|
cursor|query|false|
</details>

<details>
<summary>Response</summary>

```json
{}
```
</details>

<h3 id="api-public-hashtag">Hashtag</h3>

Get posts by hashtag ID.

Note: You can send the first request using the hashtag name ("name") then get the ID.
```javascript
api.public.hashtag({
	id: "<any>", //optional | Validate: ^[0-9]+$
	name: "<any>", //optional
	//count: 30, //optional | Validate: ^[0-9]{1,2}$
	//cursor: "<any>", //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /public/hashtag
|Parameter|Location|Required|Description|
|--|--|--|--|
id|query|false|The hashtag ID
mame|query|false|The hashtag name
count|query|false|
cursor|query|false|The starting point of items list
</details>

<details>
<summary>Response</summary>

```json
{
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
```
</details>

<h3 id="api-public-music">Music</h3>

Get posts by music ID.

```javascript
api.public.music({
	id: "6873925372153465606", //required | Validate: ^[0-9]+$
	//count: 30, //optional | Validate: ^[0-9]{1,2}$
	//cursor: "<any>", //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /public/music
|Parameter|Location|Required|Description|
|--|--|--|--|
id|query|true|The hashtag ID
count|query|false|
cursor|query|false|The starting point of items list
</details>

<details>
<summary>Response</summary>

```json
{}
```
</details>

<h2 id="api-user">User</h2>

The user endpoints require an `accountKey`
```javascript
const user = new api.user.set({
	accountKey: "myAccountKey", //required | Validate: ^[a-zA-Z0-9]{10,}$
})
```

<h3 id="api-user-profile">Profile</h3>

<h4 id="api-user-profile-info">Info</h4>

Get current user profile information
```javascript
user.profile.info({
})
```

<details>
<summary>Request</summary>

**GET** /user/info
|Parameter|Location|Required|Description|
|--|--|--|--|

</details>

<details>
<summary>Response</summary>

```json
{
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
```
</details>

<h4 id="api-user-profile-edit">Edit</h4>

Edit the user profile
```javascript
user.profile.edit({
	//nickname: "<any>", //optional
	//username: "<any>", //optional
	//bio: "My new bio", //optional
	//privacy: "<any>", //optional | Validate: ^[0-1]$
})
```

<details>
<summary>Request</summary>

**POST** /user/edit
|Parameter|Location|Required|Description|
|--|--|--|--|
nickname|body|false|
username|body|false|
bio|body|false|
privacy|body|false|
</details>

<details>
<summary>Response</summary>

```json
{
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
```
</details>

<h3 id="api-user-notifications">Notifications</h3>

Get user notifications
```javascript
user.notifications({
	//filter: "all", //optional | Allowed: all, likes, comments, mentions, followers
	//count: 20, //optional | Max: 20 | Validate: ^[0-9]{1,2}$
	//maxTime: "<any>", //optional | Validate: ^[0-9]+$
	//minTime: "<any>", //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /user/notifications
|Parameter|Location|Required|Description|
|--|--|--|--|
filter|query|false|
count|query|false|
max_time|query|false|
min_time|query|false|
</details>

<h3 id="api-user-followers">Followers</h3>

Get followers list
```javascript
user.followers({
	//count: 30, //optional | Validate: ^[0-9]{1,2}$
	//maxTime: "<any>", //optional | Validate: ^[0-9]+$
	//minTime: "<any>", //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /user/followers
|Parameter|Location|Required|Description|
|--|--|--|--|
count|query|false|
max_time|query|false|
min_time|query|false|
</details>

<h3 id="api-user-following">Following</h3>

Get following list
```javascript
user.following({
	//count: 30, //optional | Validate: ^[0-9]{1,2}$
	//cursor: "<any>", //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /user/following
|Parameter|Location|Required|Description|
|--|--|--|--|
count|query|false|
cursor|query|false|
</details>

<h3 id="api-user-follow">Follow</h3>

Follow an user
```javascript
user.follow({
	username: "lilyachty", //required
	userId: "6569595380449902597", //required
})
```

<details>
<summary>Request</summary>

**POST** /user/follow
|Parameter|Location|Required|Description|
|--|--|--|--|
username|body|true|
user_id|body|true|
</details>

<details>
<summary>Response</summary>

```json
{
	"status": "success",
	"message": "string"
}
```
</details>

<h3 id="api-user-unfollow">Unfollow</h3>

Unfollows an user
```javascript
user.unfollow({
	username: "lilyachty", //required
	userId: "6569595380449902597", //required
})
```

<details>
<summary>Request</summary>

**POST** /user/follow
|Parameter|Location|Required|Description|
|--|--|--|--|
username|body|true|
user_id|body|true|The user ID
</details>

<details>
<summary>Response</summary>

```json
{
	"status": "success",
	"message": "string"
}
```
</details>

<h3 id="api-user-feed">Feed</h3>

Get user feed posts
```javascript
user.feed({
	//count: 30, //optional | Validate: ^[0-9]{1,2}$
	//cursor: "<any>", //optional | Validate: ^[0-9]+$
	//secUid: "<any>", //optional | Validate: ^(.*?){30,}$
})
```

<details>
<summary>Request</summary>

**GET** /user/feed
|Parameter|Location|Required|Description|
|--|--|--|--|
count|query|false|
cursor|query|false|
secUid|query|false|
</details>

<h3 id="api-user-likes">Likes</h3>

Get user liked posts
```javascript
user.likes({
	//count: 30, //optional | Validate: ^[0-9]{1,2}$
	//id: "<any>", //optional | Validate: ^[0-9]+$
	//secUid: "<any>", //optional | Validate: ^(.*?){30,}$
	//maxTime: "<any>", //optional | Validate: ^[0-9]+$
	//minTime: "<any>", //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /user/likes
|Parameter|Location|Required|Description|
|--|--|--|--|
count|query|false|
id|query|false|
secUid|query|false|
max_time|query|false|
min_time|query|false|
</details>

<h3 id="api-user-explore">Explore</h3>

Get recommended posts
```javascript
user.explore({
	//count: 30, //optional | Validate: ^[0-9]{1,2}$
})
```

<details>
<summary>Request</summary>

**GET** /user/explore
|Parameter|Location|Required|Description|
|--|--|--|--|
count|query|false|
</details>

<h3 id="api-user-posts">Posts</h3>

<h4 id="api-user-posts-info">Info</h4>

Get video information/Download video
```javascript
user.posts.info({
	id: "6950501241915018501", //required | Validate: ^[0-9]+$
	//download: "<any>", //optional | Allowed: 0, 1
})
```

<details>
<summary>Request</summary>

**GET** /public/video
|Parameter|Location|Required|Description|
|--|--|--|--|
id|query|true|The video ID
download|query|false|
</details>

<h4 id="api-user-posts-like">Like</h4>

Like a video
```javascript
user.posts.like({
	mediaId: "6950501241915018501", //required | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**POST** /user/like
|Parameter|Location|Required|Description|
|--|--|--|--|
media_id|body|true|The video ID
</details>

<details>
<summary>Response</summary>

```json
{
	"status": "success",
	"message": "string"
}
```
</details>

<h4 id="api-user-posts-unlike">Unlike</h4>

Unlike a video
```javascript
user.posts.unlike({
	mediaId: "6950501241915018501", //required | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**POST** /user/like
|Parameter|Location|Required|Description|
|--|--|--|--|
media_id|body|true|The video ID
</details>

<details>
<summary>Response</summary>

```json
{
	"status": "success",
	"message": "string"
}
```
</details>

<h4 id="api-user-posts-comments">Comments</h4>

<h5 id="api-user-posts-comments-list">List</h5>

Get a video comments list
```javascript
user.posts.comments.list({
	mediaId: "6950501241915018501", //required | Validate: ^[0-9]+$
	//count: 20, //optional | Min: 20 | Validate: ^[0-9]{1,2}$
	//cursor: "<any>", //optional | Validate: ^[0-9]+$
	//authorId: "<any>", //optional
	//authorUsername: "<any>", //optional
})
```

<details>
<summary>Request</summary>

**GET** /comment/list
|Parameter|Location|Required|Description|
|--|--|--|--|
media_id|query|true|The video ID
count|query|false|
cursor|query|false|
author_id|query|false|
author_username|query|false|
</details>

<h5 id="api-user-posts-comments-replies">Replies</h5>

Get a comment reply list
```javascript
user.posts.comments.replies({
	mediaId: "6950501241915018501", //required | Validate: ^[0-9]+$
	commentId: "6950502632121548805", //required | Validate: ^[0-9]+$
	//count: 20, //optional | Validate: ^[0-9]{1,2}$
})
```

<details>
<summary>Request</summary>

**GET** /comment/reply/list
|Parameter|Location|Required|Description|
|--|--|--|--|
media_id|query|true|The video ID
comment_id|query|true|The comment ID
count|query|false|
</details>

<h5 id="api-user-posts-comments-make">Make</h5>

Post a new comment
```javascript
user.posts.comments.make({
	mediaId: "6950501241915018501", //required | Validate: ^[0-9]+$
	text: "That's cool", //required
	//commentId: "<any>", //optional | Validate: ^[0-9]+$
	//has_tags: "<any>", //optional
	//authorId: "<any>", //optional
	//authorUsername: "<any>", //optional
})
```

<details>
<summary>Request</summary>

**POST** /user/comment
|Parameter|Location|Required|Description|
|--|--|--|--|
media_id|body|true|The video ID
text|body|true|
reply_comment_id|body|false|You can reply to a comment by including a comment ID
has_tags|body|false|
author_id|body|false|
author_username|body|false|
</details>

<details>
<summary>Response</summary>

```json
{
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
```
</details>

<h5 id="api-user-posts-comments-like">Like</h5>

Like a comment
```javascript
user.posts.comments.like({
	mediaId: "6950501241915018501", //required | Validate: ^[0-9]+$
	commentId: "6950502632121548805", //required | Validate: ^[0-9]+$
	//authorId: "<any>", //optional
	//authorUsername: "<any>", //optional
})
```

<details>
<summary>Request</summary>

**POST** /user/comment/like
|Parameter|Location|Required|Description|
|--|--|--|--|
media_id|body|true|The video ID
comment_id|body|true|The comment ID
author_id|body|false|
author_username|body|false|
</details>

<details>
<summary>Response</summary>

```json
{
	"status": "success",
	"message": "string"
}
```
</details>

<h5 id="api-user-posts-comments-unlike">Unlike</h5>

Unlike a comment
```javascript
user.posts.comments.unlike({
	mediaId: "6950501241915018501", //required | Validate: ^[0-9]+$
	commentId: "6950502632121548805", //required | Validate: ^[0-9]+$
	//authorId: "<any>", //optional
	//authorUsername: "<any>", //optional
})
```

<details>
<summary>Request</summary>

**POST** /user/comment/unlike
|Parameter|Location|Required|Description|
|--|--|--|--|
media_id|body|true|The video ID
comment_id|body|true|The comment ID
author_id|body|false|
author_username|body|false|
</details>

<details>
<summary>Response</summary>

```json
{
	"status": "success",
	"message": "string"
}
```
</details>

<h3 id="api-user-conversations">Conversations</h3>

Get user conversations
```javascript
user.conversations({
	//cursor: "<any>", //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /user/conversations
|Parameter|Location|Required|Description|
|--|--|--|--|
cursor|query|false|
</details>

<details>
<summary>Response</summary>

```json
{
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
```
</details>

<h3 id="api-user-messages">Messages</h3>

Get user messages
```javascript
user.messages({
	conversationId: "<any>", //required
	conversationShortId: "<any>", //required
	//cursor: "<any>", //optional | Validate: ^[0-9]+$
	//limit: "<any>", //optional | Validate: ^[0-9]{1,2}$
})
```

<details>
<summary>Request</summary>

**GET** /user/messages
|Parameter|Location|Required|Description|
|--|--|--|--|
conversationId|query|true|
conversationShortId|query|true|
cursor|query|false|
limit|query|false|
</details>

<details>
<summary>Response</summary>

```json
{
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
```
</details>

<h3 id="api-user-live">Live</h3>

<h4 id="api-user-live-start">Start</h4>

Start a live video
```javascript
user.live.start({
	title: "Check out my live!", //required
})
```

<details>
<summary>Request</summary>

**POST** /user/live/start
|Parameter|Location|Required|Description|
|--|--|--|--|
title|body|true|
</details>

<details>
<summary>Response</summary>

```json
{
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
```
</details>

<h4 id="api-user-live-stop">Stop</h4>

Stop a live video
```javascript
user.live.stop({
})
```

<details>
<summary>Request</summary>

**POST** /user/live/stop
|Parameter|Location|Required|Description|
|--|--|--|--|

</details>

<details>
<summary>Response</summary>

```json
{
	"status": "success",
	"message": ""
}
```
</details>

<h4 id="api-user-live-info">Info</h4>

Get a live video information
```javascript
user.live.info({
	roomId: "<any>", //required
})
```

<details>
<summary>Request</summary>

**GET** /user/live/check
|Parameter|Location|Required|Description|
|--|--|--|--|
room_id|query|true|
</details>

<details>
<summary>Response</summary>

```json
{...}
```
</details>

<h4 id="api-user-live-recommend">Recommend</h4>

Get recommended live videos based on a live video
```javascript
user.live.recommend({
	roomId: "<any>", //required
})
```

<details>
<summary>Request</summary>

**GET** /user/live/recommend
|Parameter|Location|Required|Description|
|--|--|--|--|
room_id|query|true|
</details>

<details>
<summary>Response</summary>

```json
{...}
```
</details>

<h4 id="api-user-live-stats">Stats</h4>

Get a ended live video statistics
```javascript
user.live.stats({
	roomId: "<any>", //required
})
```

<details>
<summary>Request</summary>

**GET** /user/live/stats
|Parameter|Location|Required|Description|
|--|--|--|--|
room_id|query|true|
</details>

<details>
<summary>Response</summary>

```json
{
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
			"room_id": "695140311xxxxxxxxx",
			"total_score": 0
		}
	},
	"extra": {
		"now": 161850000000000
	},
	"status_code": 0
}
```
</details>

<h4 id="api-user-live-enter">Enter</h4>

```javascript
user.live.enter({
	roomId: "<any>", //required
})
```

<details>
<summary>Request</summary>

**GET** /user/live/enter
|Parameter|Location|Required|Description|
|--|--|--|--|
room_id|query|true|
</details>

<details>
<summary>Response</summary>

```json
{...}
```
</details>

<h3 id="api-user-search">Search</h3>

Search for users
```javascript
user.search({
	query: "lilyachty", //required
})
```

<details>
<summary>Request</summary>

**GET** /user/search
|Parameter|Location|Required|Description|
|--|--|--|--|
query|query|true|
</details>

<h3 id="api-user-analytics">Analytics</h3>

Get analytics for creator accounts
<h4 id="api-user-analytics-overview">Overview</h4>

```javascript
user.analytics.overview({
	//days: 7, //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /creator/analytics/overview
|Parameter|Location|Required|Description|
|--|--|--|--|
days|query|false|
</details>

<details>
<summary>Response</summary>

```json
{...}
```
</details>

<h4 id="api-user-analytics-videos">Content</h4>

```javascript
user.analytics.videos({
	//days: 7, //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /creator/analytics/videos
|Parameter|Location|Required|Description|
|--|--|--|--|
days|query|false|
</details>

<details>
<summary>Response</summary>

```json
{...}
```
</details>

<h4 id="api-user-analytics-video">Video</h4>

```javascript
user.analytics.video({
	mediaId: 690000000000000, //TikTok video ID | Required
	//days: 7, //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /creator/analytics/video
|Parameter|Location|Required|Description|
|--|--|--|--|
days|query|false|
media_id|query|true|
</details>

<details>
<summary>Response</summary>

```json
{...}
```
</details>

<h4 id="api-user-analytics-followers">Followers</h4>

```javascript
user.analytics.followers({
	//days: 7, //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /creator/analytics/followers
|Parameter|Location|Required|Description|
|--|--|--|--|
days|query|false|
</details>

<details>
<summary>Response</summary>

```json
{...}
```
</details>

<h4 id="api-user-analytics-live">Live</h4>

```javascript
user.analytics.live({
	//days: 7, //optional | Validate: ^[0-9]+$
})
```

<details>
<summary>Request</summary>

**GET** /creator/analytics/live
|Parameter|Location|Required|Description|
|--|--|--|--|
days|query|false|
</details>

<details>
<summary>Response</summary>

```json
{...}
```
</details>


## Legal
This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by TikTok or any of its affiliates or subsidiaries. This is an independent and unofficial API. Use at your own risk.