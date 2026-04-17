import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { transporter } from 'src/common/nodemailer/init.nodemailer';
import nodemailer from 'nodemailer';
import { HttpModule, HttpService } from '@nestjs/axios';
import { OLLAMA_URL } from 'src/common/constant/email.constant';

@Injectable()
export class EmailService {
  constructor(private readonly httpService: HttpService) {}
  async create(createEmailDto: any) {
    const createOrderId = createEmailDto.id;
    const email = createEmailDto.Users.email;
    const fullName = createEmailDto.Users.fullName;
    const foodName = createEmailDto.foods.name;
    const prompt = `
    Khách hàng tên ${fullName} vừa mua món ${foodName}
    ${foodName} là tên sản phẩm
    
    Bạn là một nhân viên chăm sóc khách hàng.
    Hãy viết đúng 1 câu cảm ơn ngắn gọn, chân thành, lịch sự bằng tiếng Việt để gửi cho khách hàng.
    Chỉ trả ra nội dung cảm ơn, không giải thích thêm.
    `

    const { data } = await this.httpService.axiosRef.post(OLLAMA_URL!, {
      model: 'llama3.2',
      prompt: prompt,
      stream: false
    })

    console.log(data);


    try {
      const info = await transporter.sendMail({
        from: 'phap.luquoc@hcmut.edu.vn', // sender address
        to: "phap.luquoc@hcmut.edu.vn", // list of recipients
        subject: "Hello", // subject line
        text: `Create Order Id: ${createOrderId}`, // plain text body
        html: `
          <div>
            <h3>Chúc mừng ${fullName} đặt hàng thành công</h3>
            <p>Đơn hàng mã: ${createOrderId}</p>
            <p>Sản phẩm: ${foodName}</p>
            <p>${data.response}</p>
          </div>
        `, // HTML body
      });

      console.log("Message sent: %s", info.messageId);
      // Preview URL is only available when using an Ethereal test account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
      console.error("Error while sending mail:", err);
    }
    return 'This action adds a new email';
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
