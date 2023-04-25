/*
Ziggo Connectbox V2 (Sagemcom F3896LG) reversed API by QESleepy
*/

import axios from "axios";

class Modem {
  password: string | undefined;
  token: string | undefined;
  isLoggedIn: boolean;

  constructor() {
    this.password;
    this.token;
    this.isLoggedIn = false;
  }

  async checkLogin() {
    if (!this.isLoggedIn) return console.log("Please login first...");
    else return true;
  }

  /**
   * @param {string} password The admin password on the sticker on your modem.
   * */
  async Login(password: string) {
    try {
      const response = await axios.post(
        "http://192.168.178.1/rest/v1/user/login",
        {
          password: password,
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        this.token = response.data.created.token;
        this.isLoggedIn = true;
        console.log("Login successful!");
      } else {
        return console.log("Login failed.");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  }

  async FindByHostName(hostname: string) {
    this.checkLogin();

    const hosts = await this.getConnectedHosts();

    const match = hosts.filter(
      (host: any) => host.config.hostname === hostname
    );

    if (match.length === 0) return `No host by the name of ${hostname} found..`;
    return match;
  }

  async getConnectedHosts() {
    this.checkLogin();

    try {
      const response = await axios.get(
        "http://192.168.178.1/rest/v1/network/hosts?connectedOnly=true",
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      return response.data["hosts"]["hosts"];
    } catch (error: any) {
      console.error(
        "Error occurred while getting connected hosts:",
        error.data
      );
    }
  }

  async Logout() {
    if (!this.isLoggedIn) {
      console.log(`Not logged in..`);
    }
    try {
      const response = await axios.delete(
        `http://192.168.178.1/rest/v1/user/3/token/${this.token}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      console.log(response.status);
    } catch (error: any) {
      console.error("Error occurred while logging out.", error.data);
    }
  }
}

//Example usage of the module.
async function Example() {
  //* Create new instance of a modem.
  const modem = new Modem();

  //* Login to the instance of the modem (required for most API endpoints)
  await modem.Login("YourPasswordHere.");

  //* Find by hostname (if connected).
  const SleepyPC = await modem.FindByHostName("Sleepy's PC");
  console.log(SleepyPC);

  //* Show all the hosts currently connected.
  const allHosts = await modem.getConnectedHosts();

  console.log(allHosts);
  //? Always end with logging out, otherwise a restart or 15 minutes waiting time is required to login again.
  await modem.Logout();
}
//* Uncomment the following line to test.
//Example();

export = Modem;
