<template>
<div id="component-works">
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

</div>
</template>

<script>
$('#component-works-btn-new').click(function(e) {

    $('#component-works-create').show();

    return false;
});

module.exports = {
    data: function() {
        return {
            worksCreateShown: false
        }
    },
    methods: {
        showWorksCreate: function() {
            this.worksCreateShown = true
        }
    },
    props: {
        login: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>
#component-works {
    position: absolute;
    top: 10%;
    font-size: 26px;
    text-align: left;
    width: 100%;
    height: 80%;
    background-color: rgba(255, 255, 255, 0.7);
}

#component-works-btn-new {}

#component-works-create {
    position: absolute;
    width: 50%;
    background-color: rgba(255, 255, 255, 0.7);
}
</style>
