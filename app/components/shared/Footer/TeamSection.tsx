"use client";

import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Container,
} from "@mui/material";
import { db } from "../../../firebase/firebaseConfig"; // Ensure Firestore instance import
import { collection, getDocs } from "firebase/firestore"; // Firestore functions

// Define the type for each team member
interface TeamMember {
  id: string;
  name: string;
  image: string;
  about: string;
  role: string;
}

// Card component to display each team member's details
const TeamCard: React.FC<{ teamMember: TeamMember }> = ({ teamMember }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2, borderRadius: "10px" }}>
      <CardMedia
        component="img"
        image={teamMember.image}
        alt={teamMember.name}
        sx={{
          objectFit: "cover", // Ensures the image covers the area without distortion
          borderRadius: "10px 10px 0 0",
          height: "300px",
        }}
      />
      <CardContent>
        <Typography variant="h6" component="div" align="center">
          {teamMember.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          {teamMember.role}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ fontStyle: "italic" }}
        >
          "{teamMember.about}"
        </Typography>
      </CardContent>
    </Card>
  );
};

// Main section to display the list of team members
const TeamSection: React.FC = () => {
  // Define the state with type as an array of TeamMember objects
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch team data from Firestore
    const fetchTeamData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "team")); // Fetch from 'team' collection
        const teamList: TeamMember[] = [];

        querySnapshot.forEach((doc) => {
          // Assuming the document fields are 'name', 'image', and 'about'
          teamList.push({
            id: doc.id,
            name: doc.data().name,
            image: doc.data().image,
            about: doc.data().about,
            role: doc.data().role, // Correct role assignment
          });
        });

        setTeamData(teamList); // Set the data in state
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", margin: 4 }}>
        <Typography variant="h6">Loading team data...</Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ textAlign: "center", margin: 4 }}>
        <Typography variant="h4" gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamData.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <TeamCard teamMember={member} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default TeamSection;
