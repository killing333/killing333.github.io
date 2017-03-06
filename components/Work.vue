<template lang="html">
    <div id="component-work" class="component">
        <img v-if="work.cover" class="work-icon work-icon-rounded pull-right" v-bind:src="work.cover" alt="">
        <h2>{{ work.title }}</h2>
        <a v-bind:href="work.link">{{ work.link}}</a>
        <ul id="work-categories">
            <li v-for="platform in work.platforms">
                {{platform}}
            </li>
        </ul>
        <ul id="work-tags">
            <li v-for="tag in work.tags">
                {{tag}}
            </li>
        </ul>
        <p id="work-description">{{work.description}}</p>
    </div>
</template>

<script>
import firebase from 'firebase';

module.exports = {
    computed: {
        work: function () {
            return Object.assign({}, this.work_lite, this.work_detail);
        }
    },
    firebase: function () {
        return {
            work_lite: {
                source: firebase.database().ref('works').child('lite/' + this.$route.params.id),
                asObject: true
            },
            work_detail: {
                source: firebase.database().ref('works').child('detail/' + this.$route.params.id),
                asObject: true
            }
        }
    },
}
</script>

<style lang="css">
</style>
