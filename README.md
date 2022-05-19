<p align="center">
<img src="https://img.shields.io/github/contributors/neutronvpn/api.svg?style=for-the-badge"/>
<img src="https://img.shields.io/github/forks/neutronvpn/api.svg?style=for-the-badge"/>
<img src="https://img.shields.io/github/stars/neutronvpn/api.svg?style=for-the-badge"/>
<img src="https://img.shields.io/github/issues/neutronvpn/api.svg?style=for-the-badge"/>
</p>
<br />
  <h3 align="center">api</h3>
  <br />
  <p align="center">
  ⚡ API for NeutronVPN website
  <br />
  <a href="https://github.com/neutronvpn/api/issues">Report bug</a>
  .
  <a href="https://github.com/neutronvpn/api/issues">Request a feature</a>
  </p>
<br />

### 🤔 Description
NeutronVPN API responses have a syntax. Response always have fields named `status`, `message` and `code`.
<br /> `status` field is OK or ERROR. `message` field is full variant of `code`. `code` field contains status code (not HTTP status code!) like:
<br />`user_created` is used with `status` equal OK and means that user was registered successfully.
### 💻 TODO
| Idea | Progress |
| ------ | ----------- |
| Automatic config generator | Planned |
| Get network status | Planned |

### ⚡ Endpoints
| Endpoint | Description |
| ------ | ------------------ |
| / | Returns version and list of endpoints |
| /user/register | Register a user |
| /coffee/make | Make coffee |

### 📦 Installing dependencies and running server
Install dependencies with `npm install`
Build with `tsc`
Run server with `node dist/cli`

***

Licensed in GNU General Public License v3.0 
