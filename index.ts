import { HookRequest, ResponseObject } from "rests";
import API from "./api.js";
import fetch from 'node-fetch';
import * as fs from 'fs/promises';

const TikAPI = (
    apiKey
): typeof API => {
    if (!apiKey) {
        throw new Error("The API Key is required.");
    }
    

    const on_success = function(res: ResponseObject, req: HookRequest){
        
        /**
        * A convenient method to get the next batch of items, if the endpoint has iteration parameters (e.g cursor)
        */
        const nextItems = function(){
            if(!res?.json){
                return null;
            }

            let nextCursorParams: {
                cursor?: string |number,
                offset?: string | number,
                nextCursor?: string,
                min_time?: string | number,
                max_time?: string | number
            } = {};

            if(res.json.hasMore || res.json.has_more){
                nextCursorParams.cursor = res.json.cursor;
                nextCursorParams.offset = res.json.cursor;
            }

            if(res.json.notice_lists){
                if(!Array.isArray(res.json.notice_lists) || !res.json.notice_lists.length){
                    return null;
                }

                let notice_body = res.json.notice_lists[0];

                if(!notice_body.has_more){
                    return null;
                }

                if(!notice_body.max_time || !notice_body.min_time){
                    return null;
                }

                nextCursorParams.max_time = notice_body.max_time;
                nextCursorParams.min_time = notice_body.min_time;
            
            }

            if(res.json.nextCursor){
                nextCursorParams.nextCursor = res.json.nextCursor;
            }

            if(!Object.keys(nextCursorParams).length){
                return null;
            }

            return req.self({
                ...req.params,
                ...nextCursorParams
            });
        }

        /**
        * A method for downloading and saving videos.
        */
        const saveVideo = async function(link: string, path: string, fetchOptions?: any){
            if(!res?.json){
                throw new Error("Failed saving video: Couldn't parse response JSON.")
            }

            let headers = {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
			};

            if(res.json?.$other?.videoLinkHeaders){
                headers = {
                    ...headers,
                    ...res.json.$other.videoLinkHeaders
                }
            }
			
            return fetch(link, {
                'method': 'GET',
                'headers': headers,
                ...fetchOptions
            }).then((res)=>{
                if(!res.ok){
                    return Promise.reject("Failed downloading video, received invalid response.");
                }
                return res.arrayBuffer();
            }).then((arrayBuffer)=>{
                return fs.writeFile(path, Buffer.from(arrayBuffer))
            })
        }

        res['nextItems'] = nextItems;
        res['saveVideo'] = saveVideo;
    };

    return API['set']({
        apiKey: apiKey,
        $options: {
            on_success: on_success
        }
    });
}

TikAPI.default = TikAPI;

if(typeof module !== "undefined" && module.exports){
    module.exports = TikAPI;
}

export default TikAPI;