define([
    'backbone',
    'modules/posts/collections/posts',
    'modules/posts/models/post',
    'modules/common/layouts/main',
    'modules/posts/layouts/show',
    'modules/posts/views/list',
    'modules/posts/views/show',
    'modules/posts/views/edit',
    'modules/comments/views/list'
], function(Backbone, Posts, Post, layout, showLayout, ListView, ShowView, EditView, CommentsView) {
    return new (Backbone.Router.extend({
        routes: {
            "": "listAction",
            "post/new": "newAction",
            "post/:id": "showAction",
            "post/:id/edit": "editAction"
        },

        listAction: function() {
            var posts = new Posts();

            posts.fetch().done(function() {
                layout.contentRegion.show(new ListView({collection: posts}));
            });
        },
        showAction: function(id) {
            var post = new Post({id: id});

            post.fetch().done(function() {
                layout.contentRegion.show(showLayout);

                showLayout.postRegion.show(new ShowView({model: post}));
                showLayout.commentsRegion.show(new CommentsView({collection: post.get('comments')}));
            });
        },
        newAction: function() {
            layout.contentRegion.show(new EditView());
        },
        editAction: function(id) {
            var post = new Post({id: id});

            post.fetch().done(function() {
                layout.contentRegion.show(new EditView({model: post}));
            });
        }
    }));
});