import PropTypes from 'prop-types'
import React,{Fragment} from 'react'
import {connect} from "react-redux"
import Moment from "react-moment"
import {deleteExperience} from "../../actions/profile"

const Experience = ({experience, deleteExperience}) => {

    const experiences = experience.map(exp=>(
        <tr key={exp._id}>
            <td className="light-bg">{exp.company}</td>
            <td className="hide-sm light-bg">{exp.title}</td>
            <td className="hide-sm light-bg">
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}{
                    exp.to===null?( 'Now'):(<Moment format="YYYY/MM/DD">{exp.to}</Moment>)
                }
            </td>
            <td className="light-bg">
            <button onClick={()=>deleteExperience(exp._id)} className="btn btn-danger round-btn">Delete</button>
            </td>
        </tr>
    ));
    return (
        <Fragment>   
                <h2 className="tablePosition">Experience credentials</h2>
                {experience.length>0? (
                    <Fragment>
                    <div className="tablePosition">
                    <table className="table div-max-width">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th className="hide-sm">Title</th>
                                <th className="hide-sm">Years</th>
                                <th/>
                            </tr>
                        </thead>
                        <tbody>{experiences}</tbody>
                    </table>
                    </div>
                </Fragment>):(
                    <Fragment>
                        <p className="tablePosition"> You have not added any experiences</p>
                    </Fragment>
                    
                    )}
            
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience:PropTypes.func.isRequired,
    
  };

export default connect(null, {deleteExperience})(Experience)
