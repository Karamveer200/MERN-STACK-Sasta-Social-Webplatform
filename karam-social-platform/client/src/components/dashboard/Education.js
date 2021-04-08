import PropTypes from 'prop-types'
import React,{Fragment} from 'react'
import {connect} from "react-redux"
import Moment from "react-moment"
import {deleteEducation} from "../../actions/profile"

const Education = ({education,deleteEducation}) => {

    const educations = education.map(edu=>(
        <tr key={edu._id}>
            <td className="light-bg">{edu.school}</td>
            <td className="hide-sm light-bg">{edu.degree}</td>
            <td className="hide-sm light-bg">{edu.fieldofstudy}</td>
            <td className="hide-sm light-bg">
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}{
                    edu.to===null?( 'Now'):(<Moment format="YYYY/MM/DD">{edu.to}</Moment>)
                }
            </td>
            <td className="light-bg">
            <button onClick={()=>deleteEducation(edu._id)} className="btn btn-danger round-btn">Delete</button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h2 className="my-marginup-only tablePosition">Education credentials</h2>
            {education.length>0?(<Fragment>
            <div className="tablePosition">
                    <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th className="hide-sm">Degree</th>
                            <th className="hide-sm">Field of Study</th>
                            <th className="hide-sm">Years</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>{educations}</tbody>
                    </table>
                </div>
            </Fragment>):(
                <p className="tablePosition">You have not added your Education history</p>
                )}
           
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired,
    
  };

export default connect(null, {deleteEducation})(Education)
