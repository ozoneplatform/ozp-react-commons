'use strict';

var React = require('react');
var Reflux = require('reflux');

var CategorySubscriptionActions = require('../../actions/CategorySubscriptionActions');
var CategorySubscriptionStore = require('../../stores/CategorySubscriptionStore');

var Category = React.createClass({
    propTypes: {
        category: React.PropTypes.object.isRequired,
    },

    unsubscribeFromCategory: function() {
        CategorySubscriptionActions.unsubscribeToCategory(this.props.category);
    },

    render: function() {
        var {category} = this.props;
        if (category.entity_description === "OBJECT NOT FOUND"){
            return null;
        }else{
            return (
                <li className="select2-search-choice">
                    <div>{category.entity_description}</div>
                    <a className="select2-search-choice-close" tabIndex="-1" onClick={() => this.unsubscribeFromCategory()}></a>
                </li>
            )
        }
    }

});

var CategorySubscriptions = React.createClass({
    mixins: [Reflux.connect(CategorySubscriptionStore, "categorySubscriptionStore"), Reflux.listenerMixin],

    render: function() {
        var subscriptions = this.renderCategories()

        if (subscriptions){
            return (
                <div className="select2-container select2-container-multi form-control">
                    <ul className="select2-choices">
                        {subscriptions.length === 0 ? "You are not subscribed to any categories" : subscriptions}
                    </ul>
                </div>
            );
        }
        return null;
    },

    renderCategories: function() {
        if (this.state) {
            var subscriptions = this.state.categorySubscriptionStore;
            subscriptions.sort(function(a,b) {return (a.entity_description > b.entity_description) ? 1 : ((b.entity_description > a.entity_description) ? -1 : 0);} );
            return subscriptions.map(function (category) {
                return <Category key={category.entity_id} category={category}/>
            });
        }

    }

});

module.exports = CategorySubscriptions;
module.exports.Category = Category;
