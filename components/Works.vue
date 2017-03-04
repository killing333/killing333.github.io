<template>
<div id="component-works" class="component">
    <button id="component-works-btn-new" class="pull-right btn btn-default" v-show="login" v-on:click="showWorksCreate">New</button>

    <div id="component-works-create" v-show="worksCreateShown">
        <form class="form-horizontal">
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                </div>
            </div>
            <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-default">Sign in</button>
                </div>
            </div>
        </form>
    </div>

    <div id="list-works" class="row">
        <div v-for="item in works" class="col-md-4">
            <div class="item">
                <img v-bind:src="item.cover" v-bind:alt="item.title" class="work-cover">
            </div>
            <!-- <li v-for="item in works"> -->
            <!-- <img v-if="item.logo" class="work-icon work-icon-rounded pull-right" v-bind:src="item.logo" alt="">
            <h3 class="work-title">{{ item.title }}
                <a v-for="(platform, key) in item.platform" v-bind:href="platform.link" target="_blank" class="platform-icon hidden-print">
                <svg v-if="key === 'ios'" xmlns="http://www.w3.org/2000/svg" width="170px" viewBox="0 0 170 170" version="1.1" height="170px">
                    <path d="m150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zm-31.26-123.01c0 8.1021-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.3113 11.45-8.597 4.62-2.2516 8.99-3.4968 13.1-3.71 0.12 1.0831 0.17 2.1663 0.17 3.2409z"></path>
                </svg>
                <svg v-if="key === 'android'" xmlns="http://www.w3.org/2000/svg" fill="#000000" height="48" viewBox="0 0 24 24" width="48">
                    <path d="M0 0h24v24H0z" fill="none"></path><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"></path>
                </svg>
                <svg v-if="key === 'web'" xmlns="http://www.w3.org/2000/svg" fill="#000000" height="48" viewBox="0 0 24 24" width="48">
                    <path d="M0 0h24v24H0z" fill="none"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path>
                </svg>
                <svg v-if="key === 'win'" xmlns="http://www.w3.org/2000/svg" version="1.1" height="88" width="88" viewBox="0 0 88 88">
                    <path d="m0,12.402,35.687-4.8602,0.0156,34.423-35.67,0.20313zm35.67,33.529,0.0277,34.453-35.67-4.9041-0.002-29.78zm4.3261-39.025,47.318-6.906,0,41.527-47.318,0.37565zm47.329,39.349-0.0111,41.34-47.318-6.6784-0.0663-34.739z"></path>
                </svg>
                </a>
            </h3>
            <div class="visible-print-block">iOS: https://itunes.apple.com/app/ao-men-bo-cai-zi-xun-xie-hui/id1030337540?l=zh&amp;mt=8</div>
            <div class="work-date">
                <span>{{item.date_start}}</span> - <span v-if="item.date_end">{{item.date_end}}</span><span v-else>Present</span>
            </div>
            <p v-if="item.description" class="work-description">{{item.description}}</p> -->
            <!-- </li> -->
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';

module.exports = {
    data: function() {
        return {
            worksCreateShown: false,
            login: false
        }
    },
    methods: {
        onAuthStateChanged: function(auth) {
            this.login = auth;
        },
        showWorksCreate: function() {
            this.worksCreateShown = true
        }
    },
    props: ['auth'],
    firebase: {
        works: firebase.database().ref('works').child('lite').orderByChild('order')
    },
    created() {
        //   let worksRef = firebase.database().ref('works');
        //   worksRef.child('detail').orderByChild('order').once('value').then(function(snapshot) {
        //       console.log(snapshot.val());
        //       var username = snapshot.val().username;
        //       // ...
        //   });
        //   firebase.auth.onAuthStateChanged(this.onAuthStateChanged);
    }
}
</script>

<style lang="less">@import "../css/theme";

#component-works {
    font-size: 26px;
    text-align: left;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 0 20%;
}

#component-works-btn-new {}

#component-works-create {
    position: absolute;
    width: 50%;
    background-color: rgba(255, 255, 255, 0.7);
}
#list-works {
    list-style-type: none;
    padding: 0;

    .item {
        border: 1px solid #c3c3c3;

        .work-cover {
            width: 100%;
            height: auto;
        }
        .work-title {
            font-size: 40px;
            margin-bottom: 4px;
        }

        .work-description {
            margin-top: 20px;
            font-size: 23px;
        }

        .work-icon {}

        .platform-icon {
            @icon-width: 48px;
            @icon-height: @icon-width;

            display: inline-block;
            margin: 0;
            width: @icon-width;
            height: @icon-height;

            svg {
                width: @icon-width;
                height: @icon-height;
                margin-bottom: 18px;
                fill: @theme-color-1;
            }
        }

        .work-date {
            font-size: 19px;
            color: #c3c3c3;
        }
    }
}
</style>
