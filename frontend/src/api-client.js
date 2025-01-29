const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (userformData) => {
  const response = await fetch(`http:localhost:7000/api/v1/users/signup`, {
    method: "POST",
    credentials: "include",
    body: userformData,
  });
  if (!response.ok) {
    throw new Error("Failed to register user");
  }
  return response.json();
};

export const login = async (data) => {
  const response = await fetch(`${API_BASE_URL}users/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}users/logout`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to logout");
  }
  return response.json();
};
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}users/validate-user`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json();
};

export const getUser = async () => {
  const response = await fetch(`${API_BASE_URL}users`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching the user");
  }
  return response.json();
};

export const getAllActiveRequest = async () => {
  const response = await fetch(`${API_BASE_URL}emergencyRequest`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching the requests");
  }
  return response.json();
};

export const getAllActiveCampaigns = async () => {
  const response = await fetch(`${API_BASE_URL}campaigns`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching the campaigns");
  }
  return response.json();
};

export const getRequest = async (id) => {
  const response = await fetch(`${API_BASE_URL}emergencyRequest/${id}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching the request");
  }
  return response.json();
};

export const getCampaign = async (id) => {
  const response = await fetch(`${API_BASE_URL}campaigns/${id}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching the campaign");
  }
  return response.json();
};

export const getReward = async (id) => {
  const response = await fetch(`${API_BASE_URL}rewards/${id}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching the reward");
  }
  return response.json();
};

export const markDonorAccepted = async (id) => {
  const response = await fetch(`${API_BASE_URL}emergencyRequest/${id}`, {
    method: "PUT",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Error accepting the request");
  }
  return response.json();
};

export const markDonorDonated = async (id) => {
  const response = await fetch(
    `${API_BASE_URL}emergencyRequest/donated/${id}`,
    {
      method: "PUT",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Error marking the request");
  }
  return response.json();
};
export const registerForCampaign = async (id) => {
  const response = await fetch(`${API_BASE_URL}campaigns/intrested/${id}`, {
    method: "PUT",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Error registering  the campagin");
  }
  return response.json();
};

export const markCampaignParticipation = async ({ c_id, u_id }) => {
  const response = await fetch(
    `${API_BASE_URL}campaigns/mark/campaign/${c_id}/user/${u_id}`,
    {
      method: "PUT",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Error marking  the user");
  }
  return response.json();
};

export const markRewardUsed = async ({ r_id, u_id }) => {
  const response = await fetch(
    `${API_BASE_URL}rewards/markUsed/reward/${r_id}/user/${u_id}`,
    {
      method: "PUT",
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Error marking  the reward used");
  }
  return response.json();
};

export const getDonors = async () => {
  const response = await fetch(`${API_BASE_URL}donors`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Error fetching the donors");
  }
  return response.json();
};

//

export const getOwnCampaigns = async (history) => {
  const response = await fetch(`${API_BASE_URL}users/campaigns/${history}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching the campaigns");
  }

  return response.json();
};

export const getOwnRequests = async (history) => {
  const response = await fetch(`${API_BASE_URL}users/request/${history}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching the requests");
  }
  return response.json();
};

//get reward : for hospital created by them and for donor all available
export const getRewards = async () => {
  const response = await fetch(`${API_BASE_URL}users/rewards`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching the rewards");
  }
  return response.json();
};

//redeem rewards
export const redeemReward = async (id) => {
  const response = await fetch(`${API_BASE_URL}rewards/redeem/${id}`, {
    method: "PUT",
    credentials: "include",
  });
  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Error redeeming reward");
  }
  return response.json();
};

//get redeemed rewards by user
export const getRedeemedRewards = async () => {
  const response = await fetch(`${API_BASE_URL}users/redeemed`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching the redeemed reward");
  }
  return response.json();
};

export const createRequest = async (formData) => {
  const response = await fetch(`${API_BASE_URL}emergencyRequest`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to register request");
  }
  return response.json();
};

export const createCampagin = async (formData) => {
  const response = await fetch(`${API_BASE_URL}campaigns`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to register campaign");
  }
  return response.json();
};

export const createReward = async (formData) => {
  const response = await fetch(`${API_BASE_URL}rewards`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Failed creating reward");
  }
  return response.json();
};
