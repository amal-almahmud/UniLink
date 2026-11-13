const STORAGE_KEY = "unilink_publisher_opportunities";

export const getPublisherOpportunities = () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  return saved ? JSON.parse(saved) : [];
};

export const savePublisherOpportunity = (formData, status) => {
  const opportunities = getPublisherOpportunities();

  const newOpportunity = {
    ...formData,
    id: crypto.randomUUID(),
    status: status,
    createdAt: new Date().toISOString(),
  };

  const updatedOpportunities = [...opportunities, newOpportunity];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedOpportunities)
  );

  return newOpportunity;
};
