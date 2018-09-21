'use strict';

var React = require('react');

require('bootstrap');

var BootstrapModal = React.createClass({

    propTypes: {
        buttons: React.PropTypes.array,
        confirm: React.PropTypes.string,
        cancel: React.PropTypes.string,
        onConfirm: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        onShown: React.PropTypes.func,
        onHidden: React.PropTypes.func
    },

    componentDidMount: function () {
        var me = this;

        $(this.getDOMNode())
            .one('shown.bs.modal', function () {
                if (me.props.onShown) {
                    me.props.onShown();
                }
            })
            .one('hidden.bs.modal', function () {
                if (me.props.onHidden) {
                    me.props.onHidden();
                }
            })
            .modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
    },
    
    componentWillUnmount: function(){
        this.close();
    },

    close: function () {
        $(this.getDOMNode()).modal('hide');
    },

    render: function () {
        var buttons = this.props.buttons;

        if (!buttons) {
            if (this.props.cancel) {
                buttons = [(
                    <a key="cancel" role="button"
                            className="btn btn-link" onClick={this.handleCancel}>
                        {this.props.cancel}
                    </a>
                )];
            }

            if (this.props.confirm) {
                buttons.push(
                    <a key="confirm" role="button"
                            className="btn btn-info" onClick={this.handleConfirm}>
                        {this.props.confirm}
                    </a>
                );
            }
        }

        //the size property can be set to small to avoid the modal-lg class
        var dialogClasses = React.addons.classSet({
            'modal-dialog': true,
            'modal-lg': this.props.size !== 'small'
        });

        return this.transferPropsTo(
            <div className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className={dialogClasses}>
                    <div className="modal-content">
                        {
                            this.props.modaltitle && (
                                <div className="modal-header">
                                    <button type="button" className="close"
                                            onClick={ this.handleCancel }>
                                        <span aria-hidden="true"><i className="icon-cross-16"></i></span>
                                        <span className="sr-only">Close</span>
                                    </button>
                                    <h4 className="modal-title">{this.props.modaltitle}</h4>
                                </div>
                            )
                        }
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        {
                            (buttons && buttons.length > 0) &&
                                <div className="modal-footer">
                                    {buttons}
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    },

    handleCancel: function () {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
        this.close();
    },

    handleConfirm: function () {
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }

});

module.exports = BootstrapModal;
