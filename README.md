[![Profile](https://img.shields.io/badge/Author-Craig_Beveridge-2b3137?style=flat&logo=github)](https://github.com/cbeveridge74)
[![View Skills Summary](https://img.shields.io/badge/View%20My-Skills%20Summary-blue?style=flat&logo=markdown)](https://github.com/cbeveridge74)

# 2014

# Vision

**Vision** was developed as a **Chrome App** (Chrome Apps were sunsetted in 2023), designed to **demo new healthcare concepts** and offer users an **immersive, interactive experience**.  It served both as a **prototype for feedback collection** and as a **demonstration tool** showcased at **seminars across the UK**.

---

## Overview

The app was **fully offline**, powered by **mock clinical data** stored in **indexeddb**, and focused on exploring future directions for digital healthcare interfaces.  Its offline nature allowed it to be used for demos in any location, the goal to provide a **hands-on environment** where clinicians and stakeholders could experiment with potential workflows and features.

---

## Core Functional Areas

### Appointments
Simulated patient appointment management, including scheduling and summaries.  

  
### Consultations
Displayed and managed mock clinical consultations for demonstration purposes.  

### Clinical Messaging
Modeled secure messaging between clinical users to illustrate real-time communication.  

### Fast Clinical Search
Offered **rapid and intelligent search** capabilities for:
- **Drugs**
- **Clinical codes (SNOMED CT)**  

### OCR of Clinical Correspondence
Integrated **Tesseract OCR** to scan and extract text from clinical documents,  
helping users **quickly identify and confirm key patient data**.  

### Tasks & Workflow
Enabled users to **create and manage custom workflows**, simulating a flexible task-driven clinical environment.  

---

## Technologies Used

- **AngularJS 1.3**
- **Material Design for AngularJS**
- **Tesseract (OCR Engine)**
- **d3 / NVD3 (Data Visualization and Charts)**
- **Google Analytics**

---

## Architecture

The application was structured as a **self-contained Chrome App**,  
capable of running **entirely offline** using local storage and mock data sources.

```
/app
  /components
  /services
  /views
  /data (mock JSON)
  manifest.json
```

---

## Purpose

Vision was never intended as a production system — it was a **sandbox environment** built to:
- Inspire discussion
- Showcase emerging UI and UX ideas
- Gather user feedback from clinicians and healthcare professionals

---

## Project Status

> This project is **archived** and no longer actively maintained.  
> It remains an interesting snapshot of early healthcare UX experimentation with **AngularJS** and **Material Design**.

---

## Legacy Impact

Although Vision was a demo, it influenced later projects by:
- Validating design patterns for **clinical search and workflow**
- Informing **OCR integration concepts** for clinical correspondence
- Demonstrating **offline-first design** for healthcare applications

---

## License

This project is unlicensed and was created for **demonstration and research purposes** only.
