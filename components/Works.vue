<template lang="html">
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
            <a class="item" v-bind:href="'#' + $route.fullPath + '/' + item['.key']">
                <img v-bind:src="item.cover" v-bind:alt="item.title" class="work-cover">
            </a>
        </div>
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
}

#component-works-btn-new {}

#component-works-create {
    position: absolute;
    width: 50%;
}
#list-works {
    list-style-type: none;
    padding: 0;

    .item {
        border: 1px solid #c3c3c3;
        display: block;

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

        .work-date {
            font-size: 19px;
            color: #c3c3c3;
        }
    }
}
</style>
