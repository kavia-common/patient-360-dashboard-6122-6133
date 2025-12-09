#!/bin/bash
cd /home/kavia/workspace/code-generation/patient-360-dashboard-6122-6133/patient_portal_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

