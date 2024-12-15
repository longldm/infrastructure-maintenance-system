import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ManageAccount.css'; // Import the CSS file for custom styles

interface Account {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  role: string;
}

const initialAccounts: Account[] = [
  { id: 1, username: 'admin', password: 'admin123', firstName: 'Admin', lastName: 'User', dob: '1990-01-01', role: 'Admin' },
  { id: 2, username: 'user1', password: 'user123', firstName: 'User', lastName: 'One', dob: '1995-02-02', role: 'User' },
  { id: 3, username: 'supervisor1', password: 'duong2002', firstName: 'Duong', lastName: 'Pham Thai', dob: '2002-05-08', role: 'SUPERVISOR' },
  // Add more accounts as needed
];

function ManageAccount() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('User');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleAddAccount = () => {
    const newAccount: Account = {
      id: accounts.length + 1,
      username,
      password,
      firstName,
      lastName,
      dob,
      role,
    };
    setAccounts([...accounts, newAccount]);
    setUsername('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setDob('');
    setRole('User');
  };

  const handleRowClick = (account: Account) => {
    setSelectedAccount(account);
    setUsername(account.username);
    setPassword(account.password);
    setFirstName(account.firstName);
    setLastName(account.lastName);
    setDob(account.dob);
    setRole(account.role);
  };

  const handleSaveChanges = () => {
    if (selectedAccount) {
      const updatedAccounts = accounts.map((account) =>
        account.id === selectedAccount.id
          ? { ...account, username, password, firstName, lastName, dob, role }
          : account
      );
      setAccounts(updatedAccounts);
      setSelectedAccount(null);
      setUsername('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setDob('');
      setRole('User');
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = accounts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="add-account-tab" data-bs-toggle="tab" data-bs-target="#add-account" type="button" role="tab" aria-controls="add-account" aria-selected="true">Add Account</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="manage-accounts-tab" data-bs-toggle="tab" data-bs-target="#manage-accounts" type="button" role="tab" aria-controls="manage-accounts" aria-selected="false">Manage Accounts</button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="add-account" role="tabpanel" aria-labelledby="add-account-tab">
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="SUPERVISOR">SUPERVISOR</option>
              </select>
            </div>
            <button className="btn btn-primary" onClick={handleAddAccount}>
              Add Account
            </button>
          </div>
        </div>
        <div className="tab-pane fade" id="manage-accounts" role="tabpanel" aria-labelledby="manage-accounts-tab">
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((account) => (
                  <tr key={account.id} onClick={() => handleRowClick(account)} data-bs-toggle="modal" data-bs-target="#editAccountModal">
                    <td>{account.id}</td>
                    <td className="text-truncate" title={account.username}>{account.username}</td>
                    <td className="text-truncate" title={account.password}>{account.password}</td>
                    <td className="text-truncate" title={account.firstName}>{account.firstName}</td>
                    <td className="text-truncate" title={account.lastName}>{account.lastName}</td>
                    <td className="text-truncate" title={account.dob}>{account.dob}</td>
                    <td className="text-truncate" title={account.role}>{account.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav className="fixed-bottom">
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Edit Account Modal */}
      <div className="modal fade" id="editAccountModal" tabIndex={-1} aria-labelledby="editAccountModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editAccountModalLabel">Edit Account</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="SUPERVISOR">SUPERVISOR</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSaveChanges} data-bs-dismiss="modal">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAccount;