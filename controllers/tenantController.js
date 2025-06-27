const tenantConfig = require('../config/tenants.json');

exports.getTenantConfig = (req, res) => {
  const tenant = req.query.tenant;
  if (!tenantConfig[tenant]) return res.status(404).json({ message: 'Tenant not found' });
  res.json(tenantConfig[tenant]);
};

exports.getFeatureFlags = (req, res) => {
  const { tenant, role } = req.user;
  if (!tenantConfig[tenant]) return res.status(404).json({ message: 'Tenant not found' });

  const features = tenantConfig[tenant].features;
  res.json({ features });
};
