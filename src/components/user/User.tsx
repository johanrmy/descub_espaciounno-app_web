import Layout from "@components/shared/Layout"
import Card from "@components/shared/cards/Card"
import Pagination from "@components/shared/extra/Pagination";
import Input from "@components/shared/inputs/Input";
import { useTableData } from "@data/hooks/useFetchData";
import { useFetchUsers } from "@data/hooks/useFetchUsers"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserComponent : React.FC = () => {
  const {users, error, loading} = useFetchUsers();
  const [filteredNickname, setFilteredNickname] = useState('');
  const [filteredData, setFilteredData] = useState<User[]>([]);

    useEffect(() => {
        setFilteredData(users);
    }, [users]);

    const { currentItems, handlePageClick, pageCount } = useTableData<User>({
        data: filteredData,
        itemsPerPage: 6,
    });

    const handleFilterChange = (value: string) => {
        setFilteredNickname(value)
        const filtered = users.filter(user => !value || user.first_name.toLowerCase().includes(value.toLowerCase()) || user.last_name.toLowerCase().includes(value.toLowerCase()));
        setFilteredData(filtered);
    };
  return (
    <Layout>
        <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
          <h1 className="text-2xl font-bold inline-block text-unno_pr-500 font-roboto">Usuarios</h1>
          <div className="flex items-center sm:flex-row flex-col-reverse">
            <Input
              type="text"
              placeholder="Filtrar por nombre"
              value={filteredNickname}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="sm:mx-2 mx-0"
            />
          </div>
        </div>
        <Card loading={loading} error={error} className="bg-opacity-0 shadow-none">
          <div className="grid grid-flow-row grid-cols-1  lg:grid-cols-2 2xl:grid-cols-3 gap-2 place-items-center py-5">
            {currentItems.map((user, index)  => (
              <Card className="min-w-[320px] max-w-[365px] h-full" key={index}>
              <div className="flex flex-row overflow-x-auto">
                <div className="flex flex-col w-[40%] h-auto items-center justify-center">
                  <Link to={user.id} className="rounded-full w-full">
                    <img src={user.profile_photo} alt={`profile${user.first_name}`} className="rounded-full border border-dark_ud-500 w-full h-32 bg-cover bg-center"/>
                  </Link>
                </div>
                <div className="flex flex-col w-[60%] flex-wrap">
                  <div className="px-4 font-roboto flex flex-col">
                    <Link to={user.id}><h2 className="font-bold">{`${user.first_name} ${user.last_name}`}</h2></Link>
                    <p className="font-nsans">{user.email}</p>
                    {user.is_admin &&
                      <div className={`rounded-2xl border-2 text-start my-2 font-nsans bg-descub_sc-100 border-descub_sc-200 text-descub_sc-500`}>
                        <p className="ml-2">{user.is_admin ? 'admin': 'no admin'}</p>
                      </div>
                    }
                    {user.is_superadmin &&
                      <div className={`rounded-2xl border-2 text-start mb-2 font-nsans bg-unno_pr-100 border-unno_pr-200 text-unno_pr-500`}>
                        <p className="ml-2">{user.is_superadmin ? 'root': 'no root'}</p>
                      </div>
                    }
                    {!user.is_admin && !user.is_superadmin &&
                      <div className={`rounded-2xl border-2 text-start mb-2 font-nsans bg-descub_pr-100 border-descub_pr-200 text-descub_pr-500`}>
                        <p className="ml-2">Sin privilegios</p>
                      </div>
                    }
                    <p className="font-nsans text-dark_ud-300 italic">{`creado ${new Date(user.create_datetime).toLocaleDateString()}`}</p>
                  </div>
                </div>
              </div>
            </Card>
            ))}
          </div>
        </Card>
        <Pagination handlePageClick={handlePageClick} pageCount={pageCount}/>
    </Layout>
  )
}

export default UserComponent