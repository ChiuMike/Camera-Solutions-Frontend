import * as React from 'react';
import * as MUI from "@mui/material";
import { DrawerHeader } from '../../components/drawer/Drawer.styles';
import { ControllerContainer, IRowData, Table } from '../../components/table';
import { useAxios, useAxiosWithTimeHandling } from '../../hooks/useAxios';
import { ReadUsersResponse, ApiUrl, IUserDto } from '../../apis/users';
import { AxiosResponse, RequestMethod } from '../../apis/Api';
import { UsersHeadCell } from '../../components/table/TableHeadCells';
import UserForm from './UserForm';
import Navigation from '../../components/navigation/Navigation';
import ErrorBar from '../../components/helpers/ErrorBar';
import { PageMainBox } from '../Global.styles';

const Users: React.FC = () => {

    const { loading, data: users, makeRequest: readUsers } = useAxiosWithTimeHandling<ReadUsersResponse>();
	const { makeRequest: deleteUsers, error, setError } = useAxios<AxiosResponse>({
		onSuccess: () => {
			readUsers({
				url: ApiUrl.readUsers(),
				method: RequestMethod.GET,
			})
		}
	});

    React.useEffect(() => {
		readUsers({
            url: ApiUrl.readUsers(),
            method: RequestMethod.GET,
        })
	}, [])

    return (
        <PageMainBox component="main">
            <ErrorBar error={error} setError={setError} lockedMessage={"You can't delete admin user"} />
            <DrawerHeader />
            <Navigation pageTitle={"WiBASE"}/>
            <Table
				toolBarComponent={ControllerContainer}
				data={users? users.data: []}
				headCell={UsersHeadCell}
				requestMethod={deleteUsers}
				requestOnSuccess={readUsers}
				httpMethodType={RequestMethod.DELETE}
				requestMethodUrlExtractor={(dataSelected) => ApiUrl.deleteUsers((dataSelected as IUserDto).uuid)}
				content={UserForm}
				isClickable={false}
				isController={true}
				currentLocation={window.location.pathname}
				loading={loading}
				maxWidth={'sm'}
			/>
        </PageMainBox>
    )

};

export default Users;