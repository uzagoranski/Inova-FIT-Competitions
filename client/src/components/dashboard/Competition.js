import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import { getCompetition } from '../../actions/competitionActions';
import { getRounds, deleteRound } from '../../actions/roundActions';
import { getLeaderboard } from '../../actions/leaderboardActions';
import PropTypes from 'prop-types';

class Competition extends Component {

    static propTypes = {
        getCompetition: PropTypes.func.isRequired,
        competition: PropTypes.object.isRequired,
        getRounds: PropTypes.func.isRequired,
        round: PropTypes.object.isRequired,
        getLeaderboard: PropTypes.func.isRequired,
        leaderboard: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getCompetition(this.props.match.params._id);
        this.props.getRounds(this.props.match.params._id);
        this.props.getLeaderboard(this.props.match.params._id);        
    }

    onDeleteClick = (_id) => {
        this.props.deleteRound(_id)
        setTimeout(this.props.getLeaderboard(this.props.match.params._id), 10000);
    }

    render() {
        const { competitions } = this.props.competition;
        const { rounds } = this.props.round;
        const { leaderboards } = this.props.leaderboard;
        let position = 0;
        return(
            <div className="container" style={{ minHeight: "70vh" }}>
                <div style={{ marginTop: "4rem" }} className="row">
                    <div>
                        <a className="btn-flat waves-effect" href="/competitions"><i className="material-icons left">keyboard_backspace</i> Back to list </a>
                        <h1>{competitions.name}</h1> 
                    </div>                
                    <div>
                        <Link
                            to={`/addRound/${competitions._id}`}
                            style={{
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginBottom: "40px",
                                marginTop: "20px"
                            }}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                            New round
                        </Link><br/>

                        <table className="leaderboard">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Strava segment ID</th>
                                </tr>
                            </thead>
                            <tbody>
                            { rounds.map(({ _id, date, stravaSegmentId }) => (
                                <tr key={_id}>
                                    <th scope="row"><Button
                                            className="btn btn-small waves-effect waves-light hoverable red accent-3"                                            
                                            color="danger"
                                            size="sm"
                                            style={{marginLeft: "10px"}}
                                            onClick={this.onDeleteClick.bind(this, _id)}>&times;
                                        </Button></th>
                                    <td>
                                        { date.substr(0, 10) }
                                    </td>
                                    <td>
                                        { date.substr(11, 5) }
                                    </td>
                                    <td>
                                        {stravaSegmentId}
                                    </td>
                                </tr>   
                            ))}                 
                            </tbody>
                        </table>
                    
                        <table className="tableRounds">
                            <thead>
                                <tr>
                                    <th style={{ fontWeight:"bold", paddingRight:"10px", paddingLeft:"10px"}} scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Average time</th>
                                    <th scope="col">Total distance</th>
                                    <th scope="col">Number of segments</th>
                                </tr>
                            </thead>
                            <tbody>
                           { !(leaderboards === null && leaderboards === "") ?                           
                               leaderboards.map(({ _id, name, averageTime, totalDistance, numberOfRounds }) => (
                                <tr key={_id}>   
                                    <td style={{color: "red", fontWeight:"bold", paddingRight:"10px", paddingLeft:"10px"}}>
                                        {++position}
                                    </td>                                 
                                    <td>
                                        { name }
                                    </td>
                                    <td>
                                        { averageTime }
                                    </td>
                                    <td>
                                        { totalDistance }
                                    </td>
                                    <td>
                                        { numberOfRounds }
                                    </td>
                                </tr>   
                            ))
                            :
                            <td></td>
                            }                 
                            </tbody>
                        </table>
                    </div>
                </div>                
            </div>            
        );
    }
}

const mapStateToProps = (state) => ({
    competition: state.competition,
    round: state.round,
    leaderboard: state.leaderboard,
});

export default connect(mapStateToProps, { getCompetition, getRounds, deleteRound, getLeaderboard })(Competition);