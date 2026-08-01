---
title: "Case Study: Segara Seaside Resort — Why Proper Network Cabling Matters"
description: "Rebuilding the network infrastructure at Segara Seaside Resort for better stability and easier maintenance"
lang: en
slug: case-study-segara-seaside-resort
translationKey: studi-kasus-segara-seaside
category: portofolio
tags: ["Case Study", "Network", "Resort", "Maintenance", "Setup", "MikroTik", "VLAN"]
publishDate: 2026-05-30
author: Giattech
relatedProject: segara-seaside-resort
cover: /images/blog/studi-kasus-segara-seaside.webp
coverAlt: "Case Study: Segara Seaside Resort — Why Proper Network Cabling Matters"
---

Segara Seaside Resort operates a property in Nusa Lembongan, hosting guests from OTAs, travel agents, and direct bookings. Stable internet is no longer a luxury — it is part of the guest experience. The problem was not the internet plan itself. The problem was that the network kept going up and down, and every time something went wrong, finding the source of the issue took longer than fixing it.

## The starting situation

Before the project began, this was the state of the network:

- Internet connectivity was unstable — guests regularly complained about WiFi dropping
- When an access point in a guest room went down, troubleshooting took hours
- Cable runs from the original installation were messy — no labels, no documentation
- Tracing a cable meant physically following it end to end through walls and ceilings
- All devices — guest WiFi, CCTV, and operations — shared a single flat network, competing for the same bandwidth
- There was no centralized system to monitor or manage the network

In short: when something broke, nobody knew which cable went where.

## What we found on site

During the initial survey, we traced every cable run from the rack to each access point and device. A few key findings:

**Unlabeled cables everywhere.** Not a single cable had a tag name or label. At the rack, dozens of ethernet cables came in unmarked — the only way to identify which cable served which room was to unplug it and see what went offline.

**Unstructured cable paths.** Some cables took unnecessarily long routes, others had sharp bends, and a few were bundled together with power cables. This caused interference and inconsistent connections.

**One network for everything.** CCTV cameras, guest WiFi, and front office computers all sat on the same subnet. When guests were streaming during peak hours, CCTV footage quality dropped. There was no bandwidth prioritization whatsoever.

## What we did

### Cable path reorganization

The first step was not adding new hardware — it was fixing what was already there. Every cable was labeled at both ends with a consistent format: device location, port number, and function. Damaged or excessively long cables were replaced. Messy runs were reorganized so they could be traced quickly during future troubleshooting.

The result: when a guest reports WiFi down in a specific room, staff reads the label at the rack and finds the cable immediately.

### Network segmentation with VLANs

We separated the network into distinct segments using VLANs:

**Guest VLAN** — dedicated to guest-facing WiFi. Bandwidth is allocated based on the property's available internet capacity, so usage can be controlled without affecting operations.

**CCTV VLAN** — a separate path for the surveillance system. CCTV requires consistent bandwidth for streaming and recording. With its own VLAN, footage quality is no longer degraded by guest traffic.

**Operations VLAN** — for front office computers and other internal devices.

This separation ensures each segment has a clear bandwidth allocation and does not interfere with the others.

### Centralized control with MikroTik

All VLANs are managed through MikroTik as the DHCP server and main router. From a single control point, the team can:

- Allocate bandwidth per VLAN based on the available internet capacity
- Monitor which devices are active and which are having issues
- Throttle or prioritize specific traffic
- Troubleshoot without physically going to the device location

MikroTik was chosen for its flexibility, low overhead, and widespread adoption across hospitality properties in Indonesia.

## The results

- Internet connectivity is significantly more stable — guest complaints about WiFi drops decreased drastically
- Troubleshooting that previously took hours can now be done in minutes thanks to proper labeling and documentation
- Bandwidth is managed — CCTV is no longer affected during peak guest usage, and vice versa
- The operations team can monitor network health from a single dashboard without manual cable tracing
- When new access points or devices need to be added, the existing structure and standards are already in place to follow

## Lessons learned

**Clean infrastructure saves more time than expensive hardware.** The best access point in the world will not help if the cable runs are a mess and nothing is documented. Fix the foundation first, then talk about upgrades.

**VLANs are not just for large networks.** Even for a small to mid-sized property, separating guest traffic from CCTV already makes a noticeable difference. This is about control, not scale.

**Labels are an investment.** One hour spent labeling every cable saves dozens of hours of troubleshooting down the road. There is no reason to skip this step.

## See more

A summary of this project is on our [portfolio page](/#projects). For a different case study with a different approach, read our [Bintan Prestige case study](/blog/en/case-study-bintan-prestige-transport/).

If your property's network is unreliable and troubleshooting feels like guesswork, [let's talk](/#cta).