import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err?.response?.data?.error?.message;
      throw Array.isArray(message) ? message : [message];
    }
  }


  ///// Company API routes /////

  /** Get or search all companies. */
  static async getCompanyAll(query = {}) {
    let res = await this.request(`companies`, query);
    return res.companies;
  };

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  };

  /** Post a new company. */
  static async postCompany(properties) {
    let res = await this.request(`companies`, properties, "post");
    return res.company;
  };

  /** Patch a company by handle. */
  static async patchCompany(handle, properties) {
    let res = await this.request(`companies/${handle}`, properties, "patch");
    return res.company;
  };

  /** Delete a company by handle. */
  static async deleteCompany(handle) {
    await this.request(`companies/${id}`, {}, "delete");
  };


  ///// Job API routes /////

  /** Get or search all jobs. */
  static async getJobAll(query = {}) {
    let res = await this.request(`jobs`, query);
    return res.jobs;
  };

  /** Get details on a job by handle. */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  };

  /** Post a new job. */
  static async postJob(properties) {
    let res = await this.request(`jobs`, properties, "post");
    return res.job;
  };

  /** Patch a job by handle. */
  static async patchJob(id, properties) {
    let res = await this.request(`jobs/${id}`, properties, "patch");
    return res.job;
  };

  /** Delete a job by handle. */
  static async deleteJob(id) {
    await this.request(`jobs/${id}`, {}, "delete");
  };


  ///// User API routes /////

  /** Get or search all users. */
  static async getUserAll(query = {}) {
    let res = await this.request( `users`, query);
    return res.users;
  };

  /** Get details on a user by username. */
  static async getUser(username) {
    let res = await this.request( `users/${username}`);
    return res.user;
  };

  /** Post a new user. */
  static async postUser(properties) {
    let res = await this.request( `users/`, properties, "post");
    return res.user;
  };

  /** Patch a user by username. */
  static async patchUser(username, properties) {
    let res = await this.request( `users/${username}`, properties, "patch");
    return res.user;
  };

  /** Delete a user by username. */
  static async deleteUser(username) {
    await this.request( `users/${username}`, {}, "delete");
  };


  /////// SIGN-UP & LOGIN ///////

    /** Sign up a new user */
    static async signUp(data) {
      let res = await this.request('auth/register', data, 'post');
      return res.token;
    }
  
    /** Login a user */
    static async login(data) {
      let res = await this.request('auth/token', data, 'post');
      return res.token;
    }


  //////// APPLY ///////

  /** Apply for a job */
  static async apply(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
    return res.applied;
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
