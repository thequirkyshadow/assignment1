import React, { useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Users = () => {

    const [users, setUsers] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(0);
    const [page, setPage] = React.useState(1);
    // const [itemsPerPage, setItemsPerPage] = React.useState(0)

    useEffect(() => {

        fetchPage(2)
            .then(response => response.json())
            .then(json => {
                setUsers(json.data);
                setTotalPages(json.total_pages);
                // setItemsPerPage(json.per_page);
                setPage(json.page);

            }

            )


    }, [])

    const fetchPage = (pageNumber) => {
        return fetch(`https://reqres.in/api/users?page=${pageNumber}`)
    }

    const handleChange = (event, value) => {
        setPage(value);
        fetchPage(value).then(resp => {
           return resp.json();
        }).then(json => {
            setUsers(json.data);
        })
    };
   


    return (
        <div>
            <h1>USERS</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>avatar</th>

                    </tr>
                </thead>

                <tbody>
                    {users.map(el => {
                        return (<tr key={el.id}>
                            <td>{el.id}</td>
                            <td><img style={{ height: '50px', width: '50px' }} src={el.avatar} alt={'img' + el.id} /></td>
                            <td>{el.first_name}</td>
                            <td>{el.last_name}</td>
                            <td>{el.email}</td>



                        </tr>)
                    })}

                </tbody>


            </table>
            <br />

            <Stack spacing={2}>
                <Pagination onChange={handleChange} page={page} count={totalPages} variant="outlined" />
            </Stack>



        </div>
    )
}

export default Users
