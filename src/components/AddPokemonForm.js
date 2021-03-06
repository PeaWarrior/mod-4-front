import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PokemonTeamCard from './team/PokemonTeamCard';
import { Button, Modal } from 'react-bootstrap';

export default function AddPokemonForm(props) {
    const history = useHistory();
    const { team_id, team_name, id, species } = props
    const [show, setShow] = useState(false);
    const [nickname, setNickname] = useState(species);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNicknameChange = (event) => {
        setNickname(event.target.value)
    }

    const handleSubmitAddPokemonToTeam = (event) => {
      event.preventDefault();
        fetch('http://localhost:3001/addpokemon', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                team_pokemon: {
                    nickname: nickname,
                    team_id: team_id,
                    pokemon_id: id
                }
            })
        })
        .then(resp => resp.json())
        .then(data => {
            history.push('/teams')
        })
    }
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add to team
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add {species} to {team_name}?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <PokemonTeamCard shiny={false} pokemon={props} />
              <form onSubmit={handleSubmitAddPokemonToTeam}>
                  <label>
                      Enter a nickname
                      <br/>
                      <input onChange={handleNicknameChange} type="text" name="" placeholder={species} />
                  </label>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Add Pokemon
                    </Button>
                </Modal.Footer>
              </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }