import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'
import { VelocityTransitionGroup } from 'velocity-animate/velocity.ui'

class PostsNew extends React.Component {

    renderField(field) {
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
        const spanName = field.label === "Claim:" ? "<h1>" : "<p>"
        return (
            <div className={className}>
                <h3>{field.label}</h3>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">{spanName}</span>
                    </div>
                    {spanName === "<h1>" && 
                        <input
                            className="form-control input-group-lg title"
                            type="text"
                            {...field.input}
                        />
                    }
                    {spanName === "<p>"&& 
                        <textarea
                            className="form-control input-group-lg area"
                            type="text"
                            {...field.input}
                        />
                    }
                </div>
                <div className="text-help">
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }

    renderPoints = (fields) => {
        const fieldsArray = fields["fields"]
        return(
            <ul>
            <button className="btn btn-success"type="button" onClick={() => {fieldsArray.push({})}}>
                {`add an argument`}
            </button>
            {fieldsArray.map((member, index) => (
                <div key={index}>
                <Field
                    name={`points_attributes[${index}].content`}
                    type="text"
                    component={this.renderField}
                    label={`Argument ${index + 1}`}
                />
                <button
                    className="btn btn-danger"
                    type="button"
                    title="Remove Member"
                    onClick={() => {fieldsArray.remove(index)}}>
                Delete
                </button>
                </div>
            ))}
            </ul>
        )
    }

    onSubmit = (values) => {
        this.props.createPost(values, () => {
            this.props.history.push('/')
        })
    }

    render() {
        const { handleSubmit } = this.props

        return(
            <div className="new-post">
                <div className="card text-center">
                    <h5 className="card-header">
                        "A COOL INSPIRATIONAL QUOTE GOES HERE"
                    </h5>
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Field
                            label="Claim:"
                            name="title"
                            component={this.renderField}
                        />
                        <FieldArray name={`points_attributes`} component={this.renderPoints} />
                        <div className="text-right">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to="/" className="btn btn-secondary">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const validate = (values) => {
    const points_attributes = values["points_attributes"] ? values["points_attributes"].length : 0
    const errors = {}

    if (!values.title) {
        errors.title = "Enter a title"
    }
    if (!values.points_attributes) {
        for (let i = 0; i > points_attributes ;i++) {
            if (!values.points_attributes[i].content) {
                errors.title = "Enter Valid Content"
            }
        }
    }

    return errors
}

export default reduxForm({
    validate,
    form: "PostsNewForm"
})(
   connect(null, {createPost})(PostsNew)
)