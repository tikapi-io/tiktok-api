import { HookRequest, ResponseObject } from "rests";
import API from "./api.js";

const TikAPI = (
    apiKey
): typeof API => {
    if (!apiKey) {
        throw new Error("The API Key is required.");
    }
    /**
     * A convenient method to get the next batch of items, if the endpoint has iteration parameters (e.g cursor)
     */
    const nextItems = function(res: ResponseObject, req: HookRequest){
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

        if(res.json.hasMore){
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

    const on_success = function(res: ResponseObject, req: HookRequest){
        res['nextItems'] = nextItems.bind(null, res, req);
    };

    return API['set']({
        apiKey: apiKey,
        $options: {
            on_success: on_success
        }
    });
}

export default TikAPI;