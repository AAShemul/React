import Link from 'next/link'
import Head from 'next/head'
import  { Inter } from 'next/font/google'
import axios from 'axios'
import useSWR, { SWRConfiguration, SWRResponse } from 'swr'

const  inter = Inter({ subsets: ['latin'] })

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Blog({ key, link, title }: any)
{
	return (
		<div key={ key }>
			<Link href={ link }>{ title }</Link>
		</div>
	);
}

function Test()
{
	const { data, error, isLoading } = useSWR('https://blog.shikkhaweb.com/wp-json/wp/v2/posts?_fields=author,id,excerpt,title,link', fetcher)

	if (error) return (
		<>
			<Head>
				<title>Error - WP-React</title>
			</Head>
			<h1>Error</h1>
			<p>Failed to load</p>
		</>
	);

	if (isLoading) return (
		<>
			<Head>
				<title>Loading - WP-React</title>
			</Head>
			<h1>Loading</h1>
			<p>Data is loading</p>
		</>
	);

	return (
		<>
			<Head>
				<title>Data Loaded - WP-React</title>
			</Head>
			<h1>Data Loaded</h1>
			<div>Total { data.length }</div>
			{ data.map((post: any) => (<Blog key={ post.id } link={ post.link } title={ post.title.rendered } />)) }
		</>
	)
}

export default Test;