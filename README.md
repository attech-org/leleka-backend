## Getting started

1. Clone this repo to your local machine
2. Create _.env_ file from _.env.example_:
   ```sh
   cp .env.example .env
   ```
3. Ask team lead for missing variables
4. Install dependencies:
   ```sh
   npm i
   ```
5. Run project:
   ```sh
   npm run dev
   ```
6. Api:

- Registration - post: 127.0.0.1:3001/api/auth/register
- Log in - post: 127.0.0.1:3001/api/auth/login
- Refresh access token - post: 127.0.0.1:3001/api/auth/refresh
- test authorized - get: 127.0.0.1:3001/api/testAuthorized
- Proxy Link Preview - `http://127.0.0.1:3001/api/link-preview/?url=${url}`
- Pagination query info: `https://www.npmjs.com/package/mongoose-paginate-v2`, Url example: `127.0.0.1:3001/api/tweets/?limit=1&page=2&query={"content": "bbb"}`
- Likes: Post `127.0.0.1:3001/api/likes` with twitId & userId - use for likes and dislikes
  how it works Frontend:

  ```
  import { LinkPreview } from "@dhaiwat10/react-link-preview";

  const customFetcher = async (url: string) => {
     const response = await fetch(
       `http://127.0.0.1:3001/api/link-preview/?url=${url}`
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
