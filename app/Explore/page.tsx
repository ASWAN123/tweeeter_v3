import Post from '../compoenents/post/Post'
import Create_new_post from '../compoenents/post/Post_form'
import Filter_card from '../compoenents/Filter_card'
import Search_input from './Search_input'


const page = () => {
  const options = ['Top' , 'Lastest' , 'People' , 'Media']
  return (
    <main className=" w-[95%]  md:w-[80%] mx-auto mt-4 flex gap-4 flex-col md:flex-row ">
    <section className="w-full md:min-w-[30%] md:max-w-[30%]   md:block  " >
        <Filter_card  options = {options} defaultvalue="Top" />


    </section>
    <section className="w-full md:w-[70%]  ">
        <Search_input />
        
        <div className="flex flex-col gap-4 mt-4" >
            <Post  image="/post_image.jpg" />
            <Post  image="/post_image1.jpg" />
            <Post  image="/post_image2.jpg" />

        </div>
    </section>

</main>
  )
}

export default page
