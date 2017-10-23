'use strict';

var React = require('react');
var Reflux = require('reflux');

var TagSubscriptionActions = require('../../actions/TagSubscriptionActions');
var TagSubscriptionStore = require('../../stores/TagSubscriptionStore');

var Tag = React.createClass({
    propTypes: {
        tag: React.PropTypes.object.isRequired,
    },

    unsubscribeFromTag: function() {
        TagSubscriptionActions.unsubscribeToTag(this.props.tag);
    },

    render: function() {
        var {tag} = this.props;

        return (
            <li className="select2-search-choice">
                <div>{tag.entity_description}</div>
                <a className="select2-search-choice-close" tabIndex="-1" onClick={() => this.unsubscribeFromTag()}></a>
            </li>
        )
    }

});

var TagSubscriptions = React.createClass({
    mixins: [Reflux.connect(TagSubscriptionStore, "TagSubscriptionStore"), Reflux.listenerMixin],

    render: function() {
        var subscriptions = this.renderTags()

        if (subscriptions){
            return (
                <div className="select2-container select2-container-multi form-control">
                    <ul className="select2-choices">
                        {subscriptions.length === 0 ? "You are not subscribed to any tags" : subscriptions}
                    </ul>
                </div>
            );
        }
        return null;
    },

    renderTags: function() {
        if (this.state) {
            var subscriptions = this.state.TagSubscriptionStore;
            subscriptions.sort(function(a,b) {return (a.entity_description > b.entity_description) ? 1 : ((b.entity_description > a.entity_description) ? -1 : 0);} );
            return subscriptions.map(function (tag) {
                return <Tag key={tag.entity_id} tag={tag}/>
            });
        }

    }

});

module.exports = TagSubscriptions;
module.exports.Tag = Tag;
