import type { GlobalConfig } from 'payload'

import { publicReadAuthenticatedUpdate } from '../access/globals'
import { optionalSitePathValidate, sitePathValidate } from '../fields/sitePathValidate'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'Site Settings',
  },
  access: publicReadAuthenticatedUpdate,
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoText',
      type: 'text',
      defaultValue: 'The Honeymoon Boutique',
    },
    {
      name: 'navigation',
      type: 'array',
      labels: { singular: 'Nav item', plural: 'Navigation' },
      admin: {
        description:
          'Each item needs a path (Href) that matches your page. Open Pages → your page → Slug: use /{slug} here (e.g. slug "about" → Href /about). Homepage uses slug "home" but the site URL is "/" not "/home".',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'Text shown in the menu (e.g. About, Contact).' },
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          validate: sitePathValidate,
          admin: {
            description: 'Path on this site, starting with /. Must match a published page slug.',
            placeholder: '/locations',
          },
        },
        {
          name: 'children',
          type: 'array',
          admin: {
            description:
              'Sub-links (optional). Note: the live site header currently shows only top-level links; nested items are stored for future use.',
          },
          fields: [
            { name: 'label', type: 'text' },
            { name: 'href', type: 'text', validate: optionalSitePathValidate },
          ],
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Plan My Honeymoon' },
        { name: 'href', type: 'text', defaultValue: '/contact', validate: sitePathValidate },
      ],
    },
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Site Settings',
  },
  access: publicReadAuthenticatedUpdate,
  fields: [
    {
      name: 'logoText',
      type: 'text',
      defaultValue: 'The Honeymoon Boutique',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Crafting unforgettable love stories around the world.',
    },
    {
      name: 'columns',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'Twitter / X', value: 'twitter' },
          ],
        },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2025 The Honeymoon Boutique. All rights reserved.',
    },
  ],
}

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Site Settings',
  },
  access: publicReadAuthenticatedUpdate,
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'The Honeymoon Boutique' },
    { name: 'siteTagline', type: 'text' },
    {
      name: 'defaultSEOImage',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'phoneNumber', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'address', type: 'textarea' },
  ],
}
