import BackgroundBeamsWithCollisionDemo from "@/components/ui/beams-collision";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <BackgroundBeamsWithCollisionDemo />
      {children}
    </div>
  );
}

export default layout;
