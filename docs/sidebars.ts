import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * GlassAdmin Documentation Sidebar
 * Organized structure for all documentation
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/overview',
      ],
    },
    {
      type: 'category',
      label: 'Pages',
      items: [
        'pages/overview',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/theming',
      ],
    },
  ],
};

export default sidebars;
