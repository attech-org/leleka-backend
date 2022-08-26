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

- Registration - 127.0.0.1:3001/api/auth/register
- Proxy Link Preview - `http://127.0.0.1:3001/api/proxyLinkPreview/?url=${url}`

  how it work Frontend:

  ```
  import { LinkPreview } from "@dhaiwat10/react-link-preview";

  const customFetcher = async (url: string) => {
     const response = await fetch(
       `http://127.0.0.1:3001/api/proxyLinkPreview/?url=${url}`
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

  or only get data as did at customFetcher and render it
