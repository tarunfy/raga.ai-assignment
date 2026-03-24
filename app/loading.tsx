"use client";

import { FullScreenLoader } from "@/components/common/feedback/full-screen-loader/full-screen-loader";

const Loading = () => (
  <FullScreenLoader
    description="Loading your healthcare command center."
    title="Preparing your workspace"
  />
);

export default Loading;
