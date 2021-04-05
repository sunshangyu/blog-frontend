<template>
    <Layout>
        <div class="container">
            <div class="hero">
                <h1 class="hero-title">{{$page.general.edges[0].node.title}}</h1>
                <h2 class="hero-subtitle">{{$page.general.edges[0].node.description}}</h2>
            </div>
            <div class="projects">
                <div class="project" v-for="post in $page.posts.edges" :key="post.node.title">
                    <g-link href="/projects/chelsea-landmark/" class="project-link">
						<img
                            alt="Banana"
                            :src="`http://146.56.238.178:1337${post.node.cover.url}`"
                            width="2560"
                            class="thumbnail g-image g-image--lazy g-image--loaded"
                        />
						<h3 class="project-title">{{post.node.title}}</h3>
                        <div class="categories">
                            <span class="category" v-for="tag in post.node.tags" :key="tag.title">{{tag.title}}</span>
							<span class="category">{{post.node.theme}}</span>
                        </div>
					</g-link>
                </div>
            </div>
        </div>
		<latest />
    </Layout>
</template>

<page-query>
query {
	posts: allStrapiPost {
		edges {
			node {
				title
				theme
				tags {
					title
				}
				cover {
					url
				}
			}
		}
	}
	general: allStrapiGeneral {
		edges {
			node {
				title
				description
			}
		}
	}
}
</page-query>

<script>
import Latest from '../components/Latest';
export default {
    metaInfo: {
        title: "Portfolio - NWA",
    },
	components: {
		Latest
	}
};
</script>

<style>
</style>
