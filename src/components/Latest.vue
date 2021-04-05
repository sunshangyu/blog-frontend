<template>
    <div>
        <div class="latest-journals-heading container">
            <span class="label">Latest and greatest</span>
        </div>
        <div class="latest-journals">
            <div class="container">
                <a href="/journal/gridsome-forestry-cms/" class="journal" v-for="latest in $page.edges" :key="latest.node.title">
                    <h3 class="journal-title">
                        {{latest.node.title}}
                    </h3>
                </a>
            </div>
        </div>
    </div>
</template>

<page-query>
query {
    latests: allStrapiLatest (limit: 4, page: 0, order: DESC, sortBy: "favorited_count") {
		edges  {
			node  {
				title
				favorited_count
			}
		}
	}
}
</page-query>

<script>
export default {
    name: "latest",
};
</script>

<style>
</style>