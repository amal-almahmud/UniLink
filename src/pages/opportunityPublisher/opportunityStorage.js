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

export const updatePublisherOpportunity = (id, updatedData) => {
    const opportunities = getPublisherOpportunities();
  
    const opportunityExists = opportunities.some(
      (opportunity) => opportunity.id === id
    );
  
    if (!opportunityExists) {
      throw new Error("Opportunity not found.");
    }
  
    const updatedOpportunities = opportunities.map((opportunity) => {
      if (opportunity.id === id) {
        return {
          ...opportunity,
          ...updatedData,
          id: opportunity.id,
          status: updatedData.status ?? opportunity.status,
          createdAt: opportunity.createdAt,
          updatedAt: new Date().toISOString(),
        };
      }
  
      return opportunity;
    });
  
    
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedOpportunities)
    );
  
  };
  