## Getting started

1.  Clone this repo to your local machine
2.  Create _.env_ file from _.env.example_:
    ```sh
    cp .env.example .env
    ```
3.  Ask team lead for missing variables
4.  Install dependencies:
    ```sh
    npm i
    ```
5.  Run project:
    ```sh
    npm run dev
    ```
6.  Pagination query info: `https://www.npmjs.com/package/mongoose-paginate-v2`, Url example: `/api/tweets/?limit=1&page=2&query={"content": "bbb"}`
7.  Api:

    7.1. Auth

    - Registration - post: /api/auth/register
    - Log in - post: /api/auth/login
    - Refresh access token - post: /api/auth/refresh
    - test authorized (need authorization) - get: /api/testAuthorized

      7.2. Users (need authorization)

    - get all users - get: /api/users/
    - get user by id - get: /api/users/id
    - create user - post: /api/users/
    - modify user by id - put: /api/users/id
    - delete user by id - delete: /api/users/id

      7.3. Tweets (Pagination, query, aggregation of user)

    - get tweets - get: /api/tweets/?limit=1&page=2&query={"content": "bbb"}&sort=-createdAt
    - get tweet by id - get: /api/tweets/id
    - create tweet - post: /api/tweets/
    - modify tweet by id - put: /api/tweets/id
    - delete tweet by id - delete: /api/tweets/id

      -comments - same as get tweets, but with specification of "replied to" and sort order: get: localhost:3001/api/tweets?sort=updatedAt&query={"repliedTo": "631777cd233a0e57f5b5f392"}

      7.4 Link Preview

    - Proxy Link Preview - `http:///api/link-preview/?url=${url}`

              how it works Frontend:

              ```
              import { LinkPreview } from "@dhaiwat10/react-link-preview";

              const customFetcher = async (url: string) => {
                 const response = await fetch(
                    `http:///api/link-preview/?url=${url}`
                 );
                 const json = await response.json();
                 console.warn(json.metadata);
                 return json.metadata;
              };

              const MorePage: React.FunctionComponent = () => {
              return (
                 <Layout>
                    {" "}
                    <LinkPreview
                    fetcher={customFetcher}
                    url={"https://getbootstrap.com/docs/5.0/components/card/"}
                    />
                    <LinkPreview
                    fetcher={customFetcher}
                    url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    />
                 </Layout>
              );
              };
              ```

              JSON from customFetcher is

              ```
              export interface APIOutput {
                 title?: string;
                 description?: string;
                 image?: string;
                 siteName?: string;
                 hostname?: string;
                 url?: string;
              }
              ```

              or just get the data as was done in customFetcher and render it

      7.5 Likes

    - add\delete like - post: `/api/likes`
    - get like by id - get: `/api/likes/id`
    - update like info - put: `/api/likes/id`
    - get likes by userId - get: `/api/likes/?limit=&page=&query={"user": "USER_ID"}`
    - get likes by tweetId - get: `/api/likes/?limit=&page=&query={"tweet": "TWEET_ID"}`
