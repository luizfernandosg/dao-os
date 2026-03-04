# Getting Started with DAO OS

Welcome to DAO OS - a comprehensive platform for designing and operating DAOs using composable infrastructure primitives.

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Basic knowledge of DAOs and Web3

### Installation

```bash
# Clone the repository
cd 03\ Libraries/dao-os

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start the composer in development mode
cd apps/composer
pnpm dev
```

The composer will be available at `http://localhost:3000`.

## Project Structure

```
dao-os/
├── packages/              # Shared libraries
│   ├── core/             # Core types, schemas, utilities
│   └── connectors/       # Base connector classes
├── modules/              # DAO infrastructure modules
│   ├── treasury/         # Safe, Zodiac, etc.
│   ├── governance/       # Hats, Snapshot, etc.
│   ├── funding/          # OpenGrants, Allo, etc.
│   ├── identity/         # EIP-4824, EAS
│   ├── coordination/     # Org OS integration
│   └── dao2dao/          # Proposal Inverter, etc.
└── apps/                 # Applications
    ├── composer/         # Visual design interface
    ├── dashboard/        # Operational dashboards
    └── portal/           # Member portal
```

## Core Concepts

### 1. Modules

Modules are composable infrastructure primitives that can be combined to create a complete DAO architecture. Each module:

- Has a standard specification (`module.yaml`)
- Implements the `ModuleConnector` interface
- Provides React components for configuration and display
- Includes documentation and examples

### 2. Visual Composer

The composer allows you to:

- Drag and drop modules from the palette
- Connect modules to show relationships
- Configure each module
- Validate your architecture
- Export as a blueprint

### 3. Module Connectors

Connectors integrate with external protocols and services:

- **On-chain**: Direct smart contract interactions
- **API**: REST/GraphQL API integrations
- **Manual**: User-managed integrations

### 4. Themes

DAO OS supports two themes:

- **Functional** (default): Clean, accessible, flexible
- **DAOcore**: Terminal-inspired, information-dense

Toggle between themes using the theme switcher in the header.

## Your First DAO

### Step 1: Open the Composer

Navigate to `http://localhost:3000` to access the visual composer.

### Step 2: Add a Treasury Module

1. Click on the "Treasury" category in the module palette
2. Select "Gnosis Safe"
3. The module will appear on the canvas

### Step 3: Configure the Safe

1. Click on the Safe module node
2. In the configuration panel:
   - Add signer addresses
   - Set the signature threshold
   - Choose your deployment network
3. Click "Save"

### Step 4: Add More Modules

- **Hats Protocol**: For role management
- **Snapshot**: For governance
- **OpenGrants OS**: For funding management

### Step 5: Connect Modules

Draw connections between modules to show relationships:

- Treasury → Funding (capital flow)
- Governance → Treasury (permission)
- Identity → All modules (data sync)

### Step 6: Validate Architecture

The validation panel shows:

- Configuration issues
- Missing required modules
- Architectural recommendations

### Step 7: Export Blueprint

Click "Export Blueprint" to save your DAO architecture as a JSON file that can be:

- Shared with your team
- Used for deployment
- Integrated with Organizational OS

## Module Development

Want to add a new module? See [MODULE_SPEC.md](../modules/MODULE_SPEC.md) for the complete guide.

### Quick Module Template

```bash
# Copy the template
cp -r modules/TEMPLATE modules/your-category/your-module

# Edit module.yaml
# Implement connector.ts
# Create React components
# Add documentation
# Write tests
```

## Integration with Organizational OS

DAO OS extends Organizational OS by:

1. **Generating Workspaces**: Your DAO architecture generates an Org OS workspace
2. **Syncing Data**: Module data flows into operational packages
3. **EIP-4824 Identity**: Shared identity standard
4. **Federated Design**: Multi-repository coordination

## Integration with OpenGrants OS

DAO OS connects to OpenGrants OS for:

1. **Grant Discovery**: Find relevant grant opportunities
2. **Fund Flow Visualization**: Track how grants move through your DAO
3. **Impact Reporting**: Connect funding to delivered impact
4. **DAOIP-5 Standard**: Standardized grant pool format

## Next Steps

- **Explore Modules**: Check out available modules in the palette
- **Read Documentation**: Each module has detailed docs
- **Join Community**: Connect with other DAO operators
- **Build Modules**: Contribute new integrations

## Resources

- [Module Specification](../modules/MODULE_SPEC.md)
- [Connector Development](../packages/connectors/README.md)
- [Safe Module Example](../modules/treasury/safe/README.md)
- [Organizational OS](https://github.com/organizational-os)
- [OpenGrants OS](https://github.com/opengrants-os)

## Support

- GitHub Issues: Report bugs and request features
- Discord: Join the community
- Documentation: Comprehensive guides and API reference

## License

MIT
