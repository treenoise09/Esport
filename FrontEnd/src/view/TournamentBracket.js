import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Paper, Typography, Box } from '@mui/material';
const useStyles = makeStyles({
    teamItem: {
        backgroundColor: '#f4f4f4',
        padding: '.5rem',
        display: 'block',
        margin: '.5rem 10px',
        position: 'relative',
        verticalAlign: 'middle',
        lineHeight: 2,
        textAlign: 'center',
    },
horizontalBracket: {
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        borderTop: '2px solid #4f7a38',
        width: '40px',  // Adjust based on the desired width of the horizontal line
        right: '-40px',
        top: '50%',
        transform: 'translateY(-50%)'
    }
},
matchConnectLine: {
    '&:after': {
        content: '""',
        position: 'absolute',
        borderRight: '2px solid #4f7a38',
        height: 'calc(100% + 17px)', // Adjust the height to span between matches.
        right: '-40px', 
        zIndex: '-1',
        top: '50%'
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      borderTop: '2px solid #4f7a38',
      width: '40px', // Adjust based on the desired width of the horizontal line
      right: '-40px', // Move 40px to the left of the existing line, making the total 80px to the right
      top: '50%',
      transform: 'translateY(-50%)'
    }
},
QuaterLine: {
    '&:after': {
        content: '""',
        position: 'absolute',
        borderRight: '2px solid #4f7a38',
        
        right: '-40px', 
        zIndex: '-1',
        top: '50%'
    }
},
SemiLine: {
    '&:after': {
        content: '""',
        position: 'absolute',
        borderRight: '2px solid #4f7a38',
        height: 'calc(100% + 335px)', // Adjust the height to span between matches.
        right: '-40px', 
        zIndex: '-1',
        top: '50%'
    }
},// Add this to your useStyles
finalHorizontalBracket: {
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        borderTop: '2px solid #4f7a38',
        width: '30px',  // Adjust based on the desired width of the horizontal line
        left: '-20px',  // Place the line to the left of the element to make it at the start
        top: '50%',
        transform: 'translateY(-50%)'
    }
},
startHorizontalBracket: {
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        borderTop: '2px solid #4f7a38',
        width: '30px',  // Adjust based on the desired width of the horizontal line
        left: '-20px',  // Place the line to the left of the element to make it at the start
        top: '50%',
        transform: 'translateY(-50%)'
    }
},

});
// Modify your Match component like this
function Match({
    team1, 
    team2, 
    showHorizontalBracket = false, 
    showConnectLine = false, 
    showQuaterLine = false, 
    showSemiLine = false, 
    finalHorizontalBracket = false,
    startHorizontalBracket = false // Add this new prop
}) {
    const classes = useStyles();
    return (
      <Box my={2} position="relative">
        {showConnectLine && (
          <Box position="absolute" className="someClassForVerticalLines" />
        )}
        {showQuaterLine && (
          <Box position="absolute" style={{content: '""',
          position: 'absolute',
          borderRight: '2px solid #4f7a38',
          height: 'calc(100% + 108px)', // Adjust the height to span between matches.
          right: '-40px', 
          zIndex: '-1',
          top: '50%'}} />
        )}
        {startHorizontalBracket && (
          <Box position="absolute" 
          style ={{}} />
        )}
        {finalHorizontalBracket && (
          <Box position="absolute" style ={{height: '442px',
          borderLeft: '2px solid rgb(79, 122, 56)',
          top: '-169px',
          left: '-20px'}} />
        )}
        
        <Box className={`
            ${showHorizontalBracket ? classes.horizontalBracket : ''}
            ${showConnectLine ? classes.matchConnectLine : ''}
            ${showQuaterLine ? classes.QuaterLine : ''}
            ${showSemiLine ? classes.SemiLine : ''}
            ${finalHorizontalBracket ? classes.finalHorizontalBracket : ''}
            ${startHorizontalBracket ? classes.startHorizontalBracket : ''}  
          `}
        >
          <Paper elevation={3} className={classes.teamItem}>
              <Typography>{team1}</Typography>
          </Paper>
          <Paper elevation={3} className={classes.teamItem}>
              <Typography>{team2}</Typography>
          </Paper>
        </Box>
      </Box>
    );
}





function BlankSpace() {
    const classes = useStyles();

    return (
        <Box my={2} className={classes.blankSpace}>
            <Paper elevation={0} style={{ opacity: 0, padding: '10px' }}>
                <Typography>&nbsp;</Typography>
            </Paper>
        </Box>
    );
}


function TournamentBracket({ teams }) {
    if (teams.length !== 16) {
        return <Typography>Exactly 16 teams are required!</Typography>;
    }

    return (
        <Grid container spacing={4}>
            {/* Round of 16 */}
<Grid item xs={3}  style={{paddingLeft:'60px'}}>
    {Array(8).fill().map((_, idx) => (
        <Match 
            key={idx} 
            team1={teams[idx]} 
            team2={teams[15 - idx]} 
            showConnectLine={idx % 2 === 0 && idx !== 8}
            showHorizontalBracket
        />
    ))}
</Grid>


            {/* Quarter-finals */}
            <Grid item xs={3}  style={{paddingLeft:'60px'}}>
    <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
        <Match key={0} team1={`Winner 1`} team2={`Winner 2`} showHorizontalBracket startHorizontalBracket showQuaterLine/>
        <BlankSpace />
        <Match key={1} team1={`Winner 3`} team2={`Winner 4`} showHorizontalBracket startHorizontalBracket />
        <BlankSpace />
        <Match key={2} team1={`Winner 5`} team2={`Winner 6`} showHorizontalBracket startHorizontalBracket showQuaterLine/>
        <BlankSpace />
        <Match key={3} team1={`Winner 7`} team2={`Winner 8`} showHorizontalBracket startHorizontalBracket/>
    </Box>
</Grid>


            {/* Semi-finals */}
            <Grid item xs={3}  style={{paddingLeft:'60px'}}>
                <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
                    <Match team1="Quarter Winner 1" team2="Quarter Winner 2" showHorizontalBracket startHorizontalBracket />
                    <BlankSpace />
                    <BlankSpace />
                    <BlankSpace />
                    <BlankSpace />
                    <Match team1="Quarter Winner 3" team2="Quarter Winner 4" showHorizontalBracket startHorizontalBracket/>
                </Box>
            </Grid>

            {/* Final */}
            <Grid item xs={3}  style={{paddingLeft:'60px'}}>
            <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
                <Match team1="Semi Winner 1" team2="Semi Winner 2"  finalHorizontalBracket/>
                </Box>
            </Grid>
        </Grid>
    );
}

export default TournamentBracket;