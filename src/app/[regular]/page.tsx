import MDXContent from "@/components/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { notFound } from "next/navigation";

export const generateStaticParams = () => {
  const getRegularPages = getSinglePage("pages");

  const filterRegularPages = getRegularPages.filter(
    (page: any) => !page.frontmatter.layout
  );

  const regularPages = filterRegularPages.map((page: any) => ({
    regular: page.slug,
  }));

  return regularPages;
};

// for all regular pages
const RegularPages = ({ params }: { params: { regular: string } }) => {
  const regularData = getSinglePage("pages");
  regularData[0].notFound && notFound();
  const data = regularData.filter((page) => page.slug === params.regular)[0];
  !data && notFound();
  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title} />
      <section className="section">
        <div className="container">
          <div className="content">
            <MDXContent content={content} />
          </div>
        </div>
      </section>
    </>
  );
};

export default RegularPages;
